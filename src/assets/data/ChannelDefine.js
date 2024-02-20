export function getChannels(){
    var Channels = [] ;
    //------------------APP商城-----------------------
    Channels[0] = { bCheck: false, name:"默认渠道", brand:["NULL"],              idx:0,             };  
    Channels[1] = { bCheck: false, name:"华为",     brand:["HUAWEI", "HONOR"],   idx:1,             }; 
    Channels[2] = { bCheck: false, name:"小米",     brand:["Xiaomi"],            idx:2,             };
    Channels[3] = { bCheck: false, name:"OPPO",     brand:["OPPO", "realme"],    idx:3,             };
    Channels[4] = { bCheck: false, name:"VIVO",     brand:["vivo"],              idx:4,             };    
    Channels[5] = { bCheck: false, name:"魅族",     brand:["Meizu"],             idx:5,             };     
    Channels[6] = { bCheck: false, name:"三星",     brand:["samsung"],           idx:6,             }; 
    Channels[7] = { bCheck: false, name:"一加",     brand:["OnePlus"],           idx:7,             };   
    Channels[8] = { bCheck: false, name:"京东方",   brand:["BOE"],                 idx:8,             };     
    Channels[9] = { bCheck: false, name:"苹果",     brand:["Apple"],             idx:9,             };     
    Channels[10] = { bCheck: false,name:"网页",      brand:["WEB"],              idx:10,             };     

    var ChannelsMap = new Map();
    var channelOptions = [];
    for (let index = 0; index < Channels.length; index++) {
      const element = Channels[index];
      ChannelsMap.set(element.idx, element.name);
      channelOptions.push({
        label: element.name,
        value: element.idx

      })
    }

    return {
      "ChannelsMap": ChannelsMap,
      "channelOptions": channelOptions
    }

};