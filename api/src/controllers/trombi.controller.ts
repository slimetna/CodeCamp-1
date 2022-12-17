const axios = require("axios");

export async function trombi(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }
  const response = await axios.get(
    "https://intra-api.etna-alternance.net/trombi",
    {
      headers: {
        Cookie: "authenticator=" + authenticator,
      },
    }
  );

  const data: any = response.data;

  const promos: any = [];
  for (const property in data) {
    for (let i = 0; i < data[property].length; i++) {
      promos.push(data[property][i]);
    }
  }
  res.send(promos);
}

export async function ById(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };

  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  try {
    var response = await axios.get(
      `https://intra-api.etna-alternance.net/trombi/${req.params.id}`,
      {
        headers: {
          Cookie: "authenticator=" + authenticator,
        },
      }
    );
  } catch (error) {
    res.send({ status: 401, message: "This ID does not exist" });
    return;
  }
  const data: any = response.data;
  res.send(data);
}
