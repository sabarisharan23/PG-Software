import { RouterProvider } from "react-router-dom";
import { router } from "./AppRouter";


function App() {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); 
  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <Preloader />
  //     </div> 
  //   );
  // }

  return (
    <div className="font-serif">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;