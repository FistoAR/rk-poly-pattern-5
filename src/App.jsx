import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // adjust path

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:productSlug" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
// import Home from "./components/Home";


// export default function App() {
//   return (
//     <div className="w-full h-screen">
//       {/* <ModelViewer /> */}
//       <Home/>
 
//     </div>
//   );
// }
