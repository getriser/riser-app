import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { MembersParams } from '../../types';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageHeader from '../PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchMembers } from '../../redux/slices/MembersSlice';
import Loading from '../Loading';
import MemberRow from '../MemberRow';
import { canAddMember } from '../../utils/AuthorizationUtils';
import IconButton from '../IconButton';

type MembersIndexNavigationProps = StackNavigationProp<
  MembersParams,
  'MembersIndex'
>;

interface MembersIndexProps {
  navigation: MembersIndexNavigationProps;
}

const MembersIndex: React.FC<MembersIndexProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    organizations: { currentOrganization },
    members: { members, loading },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!members) {
      dispatch(fetchMembers(currentOrganization!.id));
    }
  }, [dispatch, members]);

  const RightComponent = (
    <IconButton
      onPress={() => navigation.navigate('AddMember')}
      iconName={'user-plus'}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader
        text="Members"
        RightComponent={
          canAddMember(currentOrganization!.role) ? RightComponent : null
        }
      />
      <View style={{ flex: 1 }}>
        {loading && !members ? (
          <Loading />
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={members}
            refreshing={loading}
            onRefresh={() => dispatch(fetchMembers(currentOrganization!.id))}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MembersDetail', { id: item.id })
                }>
                <MemberRow member={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  You have no members.
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Click on the top right icon to start adding members to your
                  group!
                </Text>
              </>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MembersIndex;
