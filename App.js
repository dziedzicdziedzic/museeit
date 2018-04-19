import React, { Component } from 'react';
import { AppRegistry, Image, TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Permissions, BarCodeScanner, Speech,} from 'expo';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            chosenlanguage:'',
            languages: [
                'pl',
                'de',
                'es',
                'en'
            ],
            barcode: {
                type: '',
                data: ''
            }
        }
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const {hasCameraPermission} = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>

                    </View>
                    <View style={styles.main}>
                        <View style={styles.leftpadding}/>
                        <BarCodeScanner
                            onBarCodeRead={this.readBarCode}
                            style={styles.barcode}
                        />
                        <View style={styles.rightpadding}/>
                    </View>
                    <View style={styles.buttonsection}>
                        <TouchableOpacity
                            onPress={() => this.handleButtonClick(this.state.barcode.data,0)}
                            style={{flex:2}}
                            /*style={styles.button}*/
                        >
                            <Image
                                source={require('/home/dziedzic/WebstormProjects/museeit/assets/flags/pl.png')}
                                style={{width: '80%', height: '80%'}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.handleButtonClick(this.state.barcode.data,1)}
                            style={{flex:2}}
                            /*style={styles.button}*/
                        >
                            <Image
                                source={require('/home/dziedzic/WebstormProjects/museeit/assets/flags/de.png')}
                                style={{width: '80%', height: '80%'}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.handleButtonClick(this.state.barcode.data,2)}
                            style={{flex:2}}
                            /*style={styles.button}*/
                        >
                            <Image
                                source={require('/home/dziedzic/WebstormProjects/museeit/assets/flags/es.png')}
                                style={{width: '80%', height: '80%'}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.handleButtonClick(this.state.barcode.data,3)}
                            style={{flex:2}}
                            /*style={styles.button}*/
                        >
                            <Image
                                source={require('/home/dziedzic/WebstormProjects/museeit/assets/flags/en.png')}
                                style={{width: '80%', height: '80%'}}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputsection}>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(chosenlanguage) => this.setState({chosenlanguage})}
                            placeholder= "Type desired language"
                        />


                    <TouchableOpacity
                        onPress={() => this.handleButtonClick(this.state.barcode.data,3)}
                        style={{flex:1, backgroundColor: 'green'}}
                    >
                        {/*<Image
                            source={require('/home/dziedzic/WebstormProjects/museeit/assets/xd.png')}
                        />*/}
                        <Text>Read in selected language: {this.state.chosenlanguage}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    readBarCode = ({type, data}) => {
        const barcode = Object.assign({}, this.state.barcode, {
            type: type,
            data: data
        });
        this.setState({barcode});
    }

    handleButtonClick = (data, num) => {
        Speech.speak(data,
            {
                language: this.state.languages[num],
            });
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    barcode:{
        flex:5,
    },
    leftpadding:{
        flex:1,
    },
    rightpadding:{
        flex:1,
    },
    header: {
        flex: 3,
    },
    button:{
        backgroundColor: 'blue',
        flex: 2,
    },
    main: {
        flexDirection: 'row',
        flex:5,
    },
    buttonsection: {
        flex:1.5,
        flexDirection: 'row',justifyContent: 'space-between'
    },
    inputsection:{
        flex:1,
    },
    textinput:{
        flex: 1,
    }

});
