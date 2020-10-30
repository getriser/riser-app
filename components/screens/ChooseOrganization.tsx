import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import PageHeader from '../PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyOrganizations,
  setCurrentOrganization,
} from '../../redux/slices/OrganizationsSlice';
import { RootState } from '../../redux/rootReducer';
import Loading from '../Loading';
import { OrganizationResponse } from '../../api';
import OrganizationRow from '../OrganizationRow';

interface ChooseOrganizationProps {}

const ChooseOrganization: React.FC<ChooseOrganizationProps> = ({}) => {
  const {
    organizations: { loading, organizations },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrganizations());
  }, []);

  if (loading && organizations === null) {
    return <Loading />;
  }

  const onOrganizationSelect = (organization: OrganizationResponse) => {
    dispatch(setCurrentOrganization(organization));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader text={'My Organizations'} />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={organizations}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onOrganizationSelect(item)}>
              <OrganizationRow organization={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View>
              <Text>You have no organizations.</Text>
            </View>
          }
          ListHeaderComponent={<>{loading && <Loading />}</>}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => dispatch(getMyOrganizations())}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseOrganization;
