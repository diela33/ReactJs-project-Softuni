import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { DishContext } from "../../context/DishContext";

const DishOwner = ({ children }) => {
    const { selectDish } = useContext(DishContext);
    const { user, isAuthenticated } = useAuthContext();
    const { dishId } = useParams();

    const currentDish = selectDish(dishId);

    if (isAuthenticated && user._id !== currentDish._ownerId) {
        return <Navigate to='/recipes' replace />
    }

    return children ? children : <Outlet />;
};

export default DishOwner;
