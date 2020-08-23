import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MembersParams } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Loading from '../Loading';
import BackButton from '../BackButton';

type MembersDetailNavigationProps = StackNavigationProp<
  MembersParams,
  'MembersDetail'
>;

type MembersDetailRouteProp = RouteProp<MembersParams, 'MembersDetail'>;

interface MembersDetailProps {
  navigation: MembersDetailNavigationProps;
  route: MembersDetailRouteProp;
}

const MembersDetail: React.FC<MembersDetailProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const memberId = route.params.id;

  const { membersById, loading } = useSelector(
    (state: RootState) => state.members,
  );

  const member = membersById[memberId];

  if (loading) {
    return <Loading />;
  }

  if (!member) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <SafeAreaView
          style={{
            position: 'relative',
            top: 30,
          }}>
          <BackButton />

          <View>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  marginHorizontal: 40,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: fonts.default,
                    fontWeight: '600',
                    fontSize: 50,
                  }}>
                  {member.name}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Image
          source={{ uri: member.avatarUrl }}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            borderRadius: 500,
            borderColor: colors.primary,
            borderWidth: 5,
          }}
        />
      </View>
    </View>
  );
};

export default MembersDetail;
