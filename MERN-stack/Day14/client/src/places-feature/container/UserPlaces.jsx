import React from 'react';
import {useParams} from 'react-router-dom'
import PlaceList from '../components/PlaceList';

import {DUMMY_PLACES} from '../../data';

const UserPlaces = () => {
    const userId = useParams().uid;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === +userId);
    return (
        <div>
            <PlaceList places={loadedPlaces} />
        </div>
    );
};

export default UserPlaces;