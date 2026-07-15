import { configureStore } from "@reduxjs/toolkit";

import hcpReducer from "../features/hcpSlice";

import interactionReducer from "../features/interactionSlice";

export const store = configureStore({

    reducer:{

        hcp:hcpReducer,

        interaction:interactionReducer

    }

});