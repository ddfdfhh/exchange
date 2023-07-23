
import Image from "next/image";


export default function CandleSidebar() {
  return (
    <div className="h-100 p-2 w-full max-w-[50px] shadow-xl shadow-blue-gray-900/5">

     
      <button className="mb-2 btn btn-primary" >
        <Image width={20} height={20} src="/rectangle.png" alt="ghy" />
      </button>
    </div>
  );

}
