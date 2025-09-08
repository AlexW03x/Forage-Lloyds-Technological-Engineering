import React from 'react';
import {useState, useEffect} from 'react';
import { Navigation, NavigationContext } from './components';

export default function App(){
    return(
        <>
            <NavigationContext />
            <Navigation/>
        </>
    )
}