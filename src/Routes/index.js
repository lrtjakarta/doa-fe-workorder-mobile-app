import { AuthContext } from "Context";
import { useContext } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

export default function Routes() {
  const { authenticated } = useContext(AuthContext);

  const routing = useRoutes(routes(authenticated));
  return <>{routing}</>;
}
