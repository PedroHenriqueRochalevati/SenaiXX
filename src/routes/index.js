import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "./useAuth";

const Routes = () => {
    const { user } = useAuth();
    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;