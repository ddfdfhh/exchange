
/* eslint-disable*/
/*https://github.com/liihuu/KLineChartSample/tree/master/react-sample/src/chart */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { init, dispose, registerIndicator, Chart, registerOverlay, KLineData } from 'klinecharts'
import { MakeGetRequestNoQuery, MakeGetRequestRemoteQuery, MakeGetRequestRemoteQueryNoParam } from '../util/make_post_request'
import CandleSidebar from './candle_sidebar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import io from 'socket.io-client';
const mainIndicators = ['MA', 'EMA', 'SAR']
const subIndicators = ['VOL', 'MACD', 'KDJ']
registerOverlay({
    name: 'circle',
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 3,
    createPointFigures: function ({ overlay, coordinates }) {
        if (coordinates.length === 2) {
            const xDis = Math.abs(coordinates[0].x - coordinates[1].x)
            const yDis = Math.abs(coordinates[0].y - coordinates[1].y)
            const radius = Math.sqrt(xDis * xDis + yDis * yDis)
            return {
                key: 'circle',
                type: 'circle',
                attrs: {
                    ...coordinates[0],
                    r: radius
                },
                styles: {
                    style: 'stroke_fill'
                }
            }
        }
        return []
    }
})
registerOverlay({
    name: ' dr polygon',
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 5,
    createPointFigures: function ({ overlay, coordinates }) {
        if (coordinates.length >= 4) {

            return {
                key: 'polygon',
                type: 'polygon',
                attrs: {
                    coordinates
                },
                styles: {
                    style: 'stroke'
                }
            }
        }
        return []
    }
})


const overlays = [
    { key: 'priceLine', text: 'Line' },
    { key: 'circle', text: 'Circle' },
    { key: 'polygon', text: 'Polygon' },
    { key: 'horizontalRayLine', text: 'horizontalRayLine' },
    { key: 'horizontalSegment', text: 'horizontalSegment' },
    { key: 'segment', text: 'segment' },
    { key: 'simpleAnnotation', text: 'simpleAnnotation' },
    { key: 'simpleTag', text: 'simpleTag' },
]
let authToken: string | undefined
const isBrowser = typeof window !== "undefined";
type Ohlv = {
    close: number;
    high: number;
    low: number;
    open: number;
    timestamp: number;
    volume: number;
}
    let ws: any

export default function Indicator(props:any) {
    const [interval, setInterval] = useState('5m');
    const [wsInstance, setWsInstance] = useState<any>(null);
    const { status, data: session } = useSession()
    const chart = useRef<Chart | null>()
    const [data, updateData] = useState<Array<Ohlv>>([])
    const paneId = useRef<string>('')
    console.log('data', data)

    // useEffect(() => {
    //     console.log('inteval changed')

    //     updateData(data => []);
    // }, [interval])

    useEffect(() => {
        updateData(data => []);
        chart.current = init('indicator-k-line')
        // paneId.current = chart.current?.createIndicator('VOL', false) as string
    
        // const testurl = `https://testnet.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=100`
        const url = `https://api.binance.com/api/v3/klines?symbol=${props.coin}USDT&interval=${interval}&limit=100`
        MakeGetRequestRemoteQueryNoParam(url)
            .then((res: any) =>
            {
                let res1 = res.data.map((v: any) => {
                    return {
                        close: parseFloat(v[4]),
                        high: parseFloat(v[2]),
                        low: parseFloat(v[3]),
                        open: parseFloat(v[1]),
                        timestamp: v[0],
                        volume: parseFloat(v[5])
                    }
                })
                updateData(data => [...data, ...res1])
                console.log('here', data)
                if (isBrowser) {
                    ws = new WebSocket('wss://stream.binance.com:9443/ws');
                    ws.onopen = function () {
                        ws.send(JSON.stringify(
                            {
                                "method": "SUBSCRIBE",
                                "params": [
                                    `${(props.coin).toLowerCase()}usdt@kline_${interval}`

                                ],
                                "id": 12
                            }
                        ))
                        console.log("Connection opened...");
                    };

                    ws.onmessage = function (event: any) {
                        const r = JSON.parse(event.data);
                        console.log(r['result'])
                        if (r['result'] === undefined) {
                            // console.log('my r',r['k'])
                            let res1: Ohlv = {

                                close: r['k']['c'],
                                high: r['k']['h'],
                                low: r['k']['l'],
                                open: r['k']['o'],
                                timestamp: r['E'],
                                volume: r['k']['v']

                            }

                            updateData(data => [...data, res1]); console.log('now', data)
                        }
                    };

                    ws.onclose = function () {
                        console.log("Connection closed...");
                    };



                }
            })



        return () => {
            dispose('indicator-k-line')
            if (ws!==undefined && ws?.readyState !== 3)
                ws.close(1000,'unknown')


        }
    }, [interval]);


    useEffect(() => {

        if (status == 'authenticated') {
            authToken = session?.user?.accessToken
            console.log('token', authToken)

        }
       

    }, [status])



    useEffect(() => {

        console.log('i m changed')
        chart.current?.applyNewData(data)




    }, [data])
    return <>
        <div className="row g-0">
            {/* <div className="col-md-2 mr-0 pr-0 me-0 pe-0"><CandleSidebar /> </div> */}
            <div className="col-md-12 ml-0 pl-0 ms-0 ps-0">
                <div className="toolbox d-flex gap-2" style={{ height: '50px' }}>

                    <div className="btn-group btn-group-xs" style={{ height: '31px' }} role="group" aria-label="Basic example">
                        <button type="button" className={`btn btn-light ${interval=='5m'?'active':''}`} onClick={e => setInterval('5m')}>5m</button>
                        <button type="button" className={`btn btn-light ${interval=='1h'?'active':''}`} onClick={e => setInterval('1h')}>1h</button>
                        <button type="button" className={`btn btn-light ${interval=='1d'?'active':''}`} onClick={e => setInterval('1d')}>1d</button>
                        <button type="button" className={`btn btn-light ${interval=='1w'?'active':''}`} onClick={e => setInterval('1w')}>1w</button>
                        <button type="button" className={`btn btn-light ${interval=='1M'?'active':''}`} onClick={e => setInterval('1M')}>1m</button>
                    </div>
                </div>
                <div id="indicator-k-line" className="k-line-chart" style={{ height: '400px' }} ></div>
            </div>



            {/* <div
            className="k-line-chart-menu-container">
            <span style={{ paddingRight: 10 }}>主图指标</span>
            {
                mainIndicators.map(type => {
                    return (
                        <button
                            key={type}
                            onClick={_ => {
                                chart.current?.createIndicator(type, false, { id: 'candle_pane' })
                            }}>
                            {type}
                        </button>
                    )
                })
            }
            <button
                onClick={_ => {
                    chart.current?.createIndicator('EMOJI', true, { id: 'candle_pane' })
                }}>
                自定义
            </button>
            <span style={{ paddingRight: 10, paddingLeft: 12 }}>副图指标</span>
            {
                subIndicators.map(type => {
                    return (
                        <button
                            key={type}
                            onClick={_ => {
                                chart.current?.createIndicator(type, false, { id: paneId.current })
                            }}>
                            {type}
                        </button>
                    )
                })
            }
            <button
                onClick={_ => {
                    chart.current?.createIndicator('EMOJI', false, { id: paneId.current })
                }}>
                自定义
            </button>
        </div> */}
            {/* <div
            className="k-line-chart-menu-container">
            <button className="btn btn-primary"
                onClick={() => {
                    const dataList = chart.current?.getDataList() ?? []
                    const data = dataList[dataList.length - 20] as KLineData
                    chart.current?.createOverlay({
                        name: 'simpleAnnotation',
                        extendData: 'Extended',
                        points: [{ timestamp: data.timestamp, value: data.high }]
                    })
                }}>
               Crete f
            </button>
            <button className="btn btn-primary"
                onClick={() => {
                    const dataList = chart.current?.getDataList() ?? []
                    const data = dataList[dataList.length - 10] as KLineData
                    chart.current?.createOverlay({
                        name: 'simpleTag',
                        extendData: 'Tag e',
                        points: [{ value: data.high }]
                    })
                }}>
                No 
            </button>
            {
                overlays.map(({ key, text }) => {
                    return (
                        <button className="btn btn-primary"
                            key={key}
                            onClick={_ => {
                                chart.current?.createOverlay(key)
                            }}>
                            Create  {text}
                        </button>
                    )
                })
            }
            <button className="btn btn-primary"
                onClick={() => {
                    chart.current?.removeOverlay()
                }}>
                Remove
            </button>




        </div> */}
        </div>
    </>
}