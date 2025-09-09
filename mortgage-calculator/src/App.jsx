import React from 'react';
import {useState, useEffect} from 'react';
import { Breadcrumbs, Navigation, NavigationContext, Portal } from './components';

export default function App(){
    return(
        <>
            <NavigationContext />
            <Navigation/>
            <Breadcrumbs/>

            {/* Calculator Components */}
            <Portal/>
        </>
    )
}