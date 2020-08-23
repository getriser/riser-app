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

type MembersIndexNavigationProps = StackNavigationProp<
  MembersParams,
  'MembersIndex'
>;

interface MembersIndexProps {
  navigation: MembersIndexNavigationProps;
}

const MembersIndex: React.FC<MembersIndexProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { members, loading } = useSelector((state: RootState) => state.members);

  useEffect(() => {
    if (!members) {
      dispatch(fetchMembers());
    }
  }, [dispatch, members]);

  return (
    <SafeAreaView>
      <PageHeader text="Members" />
      <View>
        {loading && !members ? (
          <Loading />
        ) : (
          <FlatList
            data={members}
            refreshing={loading}
            onRefresh={() => dispatch(fetchMembers())}
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
