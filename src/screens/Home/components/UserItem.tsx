import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COMMON_STYLES, COMMON_COLORS} from '../../../styles';
import {ImagePlaceholder} from '../../../components';
import {HeartSvg} from '../../../assets/heart';
import {TUser} from '../../../app/API';

interface IProps {
    item: TUser;
    onRemove?: (id: number) => void;
    navigateToUserDetails: (userId: number) => void;
}

export function UserItem(props: IProps) {
    const {item, onRemove, navigateToUserDetails} = props;
    const {avatar, name, id, age, isLiked} = item;

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);
    const handleNavigateToUserDetails = useCallback(
        () => navigateToUserDetails(item.id),
        [item, navigateToUserDetails],
    );

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.iconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderLike = useCallback(
        () => <HeartSvg color={isLiked ? COMMON_COLORS.red : COMMON_COLORS.black_transparent} />,
        [isLiked],
    );

    const renderBody = useCallback(() => {
        return (
            <TouchableOpacity style={styles.body} onPress={handleNavigateToUserDetails}>
                {renderImage()}
                {renderLike()}
                {renderDescription()}
                {renderRemoveButton()}
            </TouchableOpacity>
        );
    }, [renderDescription, renderImage, renderRemoveButton, handleNavigateToUserDetails, renderLike]);

    const renderContainer = useCallback(() => {
        return <View style={styles.container}>{renderBody()}</View>;
    }, [renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
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
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    removeIcon: {
        fontSize: 24,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
