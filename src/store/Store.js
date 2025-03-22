import axios from 'axios';
import {create} from 'zustand';

export const Store = create((set, get) => ({
    activeVal: false,
    activeOnOff: () => set((state)=>({activeVal: !state.activeVal})),
    activeReset:() =>set({activeVal : false}),
    detailId: null,
    detailIdUpdate: (value) => set((state)=>({detailId: value})),
    titleId: null,
    titleIdUpdate: (value) => set((state)=>({titleId: value})),
    fishbowlToken : "",
    fishbowlTokenUpdate : (value)=> set((state)=>({fishbowlToken : value})),
    timeEditVal: false,
    timeEditOn: () => set((state)=>({timeEditVal: true})),
    timeEditOff: () => set((state)=>({timeEditVal: false})),
    reserveId: "",
    reserveIdUpdate:(val)=>set((state)=>({reserveId : val})),
    switchVal: "",
    switchValUpdate: (val) => set((state)=>({switchVal: val})),


    // 알람 리스트 가져오는 함수
    reserveList: [],
    reserveListGet: async (title) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/${title}/reserve-list`, {
                headers: {
                    'Authorization': localStorage.getItem("accessToken"),
                    'X-Fishbowl-Token': get().fishbowlToken, 
                },
            });
            set({ reserveList: response.data });
        } catch (error) {
            console.error("Error fetching reserve list:", error);
        }
    },
}))