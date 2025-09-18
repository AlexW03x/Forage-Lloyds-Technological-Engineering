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