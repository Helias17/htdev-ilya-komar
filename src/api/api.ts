import axios from "axios";

const worldTimeItem = axios.create({
  baseURL: "https://worldtimeapi.org/api/timezone/",
});

export const timezoneApi = {
  async getTimezoneItem(timezone: string) {
    return worldTimeItem.get(timezone);
  },
  async getTimezoneList() {
    return worldTimeItem.get("");
  },
};
