import React, {useCallback, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {USERPIC_SIZE, HEART_ICON_SIZE} from '../../app/constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchUserThunk} from '../../app/asyncActions/users';
import {Loader, ImagePlaceholder} from '../../components';
import {COMMON_COLORS, COMMON_STYLES} from '../../styles';
import {getUserDetails} from '../../app/selectors/users';
import {toggleLikeUser} from '../../app/actions/users';
import {HeartSvg} from '../../assets/heart';
import {TUser} from '../../app/API';

type UserProps = {
    userId: number;
};

const User = ({userId}: UserProps) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.users.userDetailsStatus);
    const userData = useAppSelector(getUserDetails);

    useEffect(() => {
        dispatch(fetchUserThunk(userId));
    }, [dispatch, userId]);

    const likeUser = useCallback(
        (id: number) => {
            dispatch(toggleLikeUser(id));
        },
        [dispatch],
    );

    const renderDescription = useCallback(
        (user: TUser) => (
            <View style={styles.text}>
                <Text>id: {user.id}</Text>
                <Text>Name: {user.name}</Text>
                <Text>Age: {user.age}</Text>
            </View>
        ),
        [],
    );

    const renderImage = useCallback(
        (user: TUser) => (
            <View style={styles.imageContainer}>
                {user.avatar ? <Image style={styles.image} source={{uri: user.avatar}} /> : <ImagePlaceholder />}
                <TouchableOpacity onPress={() => likeUser(user.id)} style={styles.likeBtn}>
                    <HeartSvg
                        color={user.isLiked ? COMMON_COLORS.red : COMMON_COLORS.black_transparent}
                        size={HEART_ICON_SIZE}
                    />
                </TouchableOpacity>
            </View>
        ),
        [likeUser],
    );

    if (status === 'loading') {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                {userData ? (
                    <>
                        {renderImage(userData)}
                        {renderDescription(userData)}
                    </>
                ) : (
                    <Text>User by provided ID: {userId} is not found</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: USERPIC_SIZE,
        width: USERPIC_SIZE,
        borderWidth: 1,
        borderRadius: 16,
    },
    likeBtn: {
        position: 'absolute',
        bottom: -(HEART_ICON_SIZE / 2),
        left: 0,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
});

export default User;
