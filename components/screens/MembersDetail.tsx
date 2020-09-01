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
import MemberInfoRow from '../MemberInfoRow';

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
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <Image
            source={{ uri: member.avatarUrl }}
            style={{
              width: 250,
              height: 250,
              borderRadius: 300,
              alignSelf: 'center',
              borderColor: '#fff',
              borderWidth: 5,
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 50, marginVertical: 30 }}>
          <MemberInfoRow name={'Name'} value={member.name} />
          <MemberInfoRow name={'Username'} value={`@${member.username}`} />
          <MemberInfoRow name={'Email'} value={member.email} />
        </View>
      </View>
    </View>
  );
};

export default MembersDetail;
