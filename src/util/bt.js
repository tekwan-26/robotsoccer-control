import bluetoothSerial from "cordova-plugin-bluetooth-serial"

export const isEnable = () => {
    return new Promise((resolve, reject) => {
        bluetoothSerial.isEnabled(() => resolve(true), (err) => reject(err));
    })
}

export const disconnect = async() => {
    try {
        return new Promise((resolve, reject) => {
            bluetoothSerial.isConnected(() => {
                bluetoothSerial.disconnect(() => resolve(true), (err) => reject(err));
            }, (err) => reject(err))
        })
    } catch(e) {
        throw e;
    }
}

export const list = async() => {
    try {
        await isEnable();
        return new Promise((resolve, reject) => {
            bluetoothSerial.list((data) => {
                resolve(data);
            }, (err) => {
                reject(err);
            })
        })
    } catch(err) {
        throw err;
    }
}

export const write = async(data, addr) => {
    try {
        await isEnable();
        return new Promise((resolve, reject) => {
            bluetoothSerial.isConnected(() => {
                bluetoothSerial.write(data, () => resolve(true), (err) => reject(err));
            }, () => {
                bluetoothSerial.connect(addr, () => {
                    bluetoothSerial.write(data, () => resolve(true), (err) => reject(err));
                }, (err) => reject(err))
            })
        })
    } catch(e) {
        throw e;
    }
}