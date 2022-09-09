import { useQuery } from "react-query";
import axios from "axios";

//id: number
export async function findInventoryUserById() {
  const id = "76561198293824937";

  let data = [];

  await axios({
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    url: `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/inventory/76561198293824937/730/2?l=brazilian&count=16`,
    responseType: "stream",
  })
    .then((response) => {
      console.log(response.data.descriptions);
      data = response.data.descriptions;
    })
    .catch((e) => {
      console.log(e);
    });

  

  data = data.map((e) => {
    return {
      appId: e.appid,
      classId: e.classid,
      iconUrl: e.icon_url,
      inspect:e.market_actions == undefined ? null : e.market_actions[0].link,
      hashName: e.market_hash_name,
      marketName: e.market_name,
      borderColor: e.name_color,
      type: e.type,
    };
  });
  console.log(data);
}
