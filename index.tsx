import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import {store} from './src/app/store';
import {Home, User} from './src/screens';
import {ScreenNames} from './src/app/interfaces/screenNames';

Navigation.registerComponent(
    ScreenNames.HomeScreen,
    () => props =>
        (
            <Provider store={store}>
                <Home {...props} />
            </Provider>
        ),
    () => Home,
);
Navigation.registerComponent(
    ScreenNames.UserScreen,
    () => props =>
        (
            <Provider store={store}>
                <User {...props} />
            </Provider>
        ),
    () => User,
);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: ScreenNames.HomeScreen,
                        },
                    },
                ],
            },
        },
    });
});
