import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import UsersList from './components/UsersList';
import {store} from '../../app/store';

type HomeProps = {
    componentId: string;
};

const Home = ({componentId}: HomeProps) => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UsersList componentId={componentId} />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1, backgroundColor: '#fff'}});

export default Home;
