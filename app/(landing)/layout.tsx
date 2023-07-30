
export const metadata = {
    title: 'Wuatex Exchange',
    description: 'Generated by create next app',
    view: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<html lang="en">
        <head>
            <link rel="icon" href="/logo.png" sizes="any" />
          <link rel="stylesheet" href="frontend/assets/css/normalize.css" />
        {/*=== Bootstrap ===*/}
        <link rel="stylesheet" href="frontend/assets/css/bootstrap.min.css" />
        {/*=== Fontawesome icon ===*/}
        <link
            rel="stylesheet"
            href="frontend/assets/css/font-awesome-5.10.2.min.css"
        />
        {/*=== nice-select Popup===*/}
        <link rel="stylesheet" href="frontend/assets/css/plugin/nice-select.css" />
        {/*=== Animation Css ===*/}
        <link rel="stylesheet" href="frontend/assets/css/plugin/animate.css" />
        {/*=== Main Css ===*/}
        <link rel="stylesheet" href="frontend/assets/css/style.css" />
        {/*=== Responsive Css ===*/}
        <link rel="stylesheet" href="frontend/assets/css/responsive.css" />
        </head>
        <body  suppressHydrationWarning={true} >
            {children}
         <script src="frontend/assets/js/jquery.min.js"></script>
    <script src="frontend/assets/js/proper-min.js"></script>
    <script src="frontend/assets/js/bootstrap.min.js"></script>
  
    <script src="frontend/assets/js/plugin/waypoint.min.js"></script>
    <script src="frontend/assets/js/plugin/jquery.rcounter.js"></script>
    <script src="frontend/assets/js/plugin/jquery.nice-select.min.js"></script>
    <script src="frontend/assets/js/plugin/tweenMax.min.js"></script>
    <script src="frontend/assets/js/plugin/paroller.js"></script>
    <script src="frontend/assets/js/plugin/wow.min.js"></script>

    
    <script src="frontend/assets/js/main.js"></script>
        </body>
    </html>
    );
}
