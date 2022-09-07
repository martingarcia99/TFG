import { Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import NfcManager from 'react-native-nfc-manager'
import HCESession, { NFCContentType, NFCTagType4 } from 'react-native-hce'
import * as encoding from 'text-encoding';

const HomeScreen = ({email, password}) => {

    /*const [hasNfc, setHasHfc] = useState(null)

    React.useEffect(() => {
        async function checkNfc(){
            const supported = await NfcManager.isSupported()
            if(supported) {
                await NfcManager.start()
            }
            setHasHfc(supported)
        }

        checkNfc()
    },[])

    if (hasNfc != null){
        return (
            <View style={styles.wrapper}>
                <Text>You device support NFC</Text>
            </View>
        )
    }else if(!hasNfc){
        return (
            <View style={styles.wrapper}>
                <Text>You device doesn't support NFC</Text>
            </View>
        )
    }*/

    //const simulationInstance = useRef<HCESession>(true)

    let simulation 

    const startSimulation = async () => {
        let content="hello"
        const tag = new NFCTagType4(NFCContentType.Text, content)
        simulation = await (new HCESession(tag)).start()
        console.log("Activando Simulador de Tag")
    }

    const stopSimulation = async () => {
        await simulation.terminate()
        console.log("Desactivando Simulador de Tag")
    } 
    //stopSimulation();*/
    
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={startSimulation}>
                <Text>Activate NFC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopSimulation}>
                <Text>Parar NFC</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HomeScreen