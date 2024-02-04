const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    }
});

contextBridge.exposeInMainWorld('sys_info', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    arch: () => process.arch,
    platformOS: () => process.platform,
    ping: () => ipcRenderer.invoke('ping'),
    osRelease: (callback) => ipcRenderer.on('get-os-release', (_event, value) => callback(value))
});
