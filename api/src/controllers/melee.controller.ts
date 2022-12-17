const moment = require("moment");
import meleeModel from "../db/models/melee.model";
import lastMeleeModel from "../db/models/lastMelee.model";

export async function getAllMelee(req: any, res: any) {
  const melee = await meleeModel.find({});
  if (melee) {
    return res.send(melee);
  };
  return res.send({
    code: 404,
    error: "No melee found",
  });
};

export async function getMelee(req: any, res: any) {
  const melee = await meleeModel.findOne({ _id: req.params.id });
  if (melee) {
    return res.send(melee);
  }
  return res.send({
    code: 404,
    error: "No melee found",
  });
}

export async function createMelee(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  let data: any = req.body;
  let counter = 1;

  let end = moment(data.dateEnd).toDate();
  let start = moment(data.dateStart).toDate();

  while (start.getTime() < end.getTime()) {
    if (data.frequence === 0) {
      let newStartDate = moment(start)
        .add(data.duration + data.pause, "minutes")
        .toDate();
      let newEndDate = moment(start).add(data.duration, "minutes").toDate();
      await meleeModel.create({
        startAt: start,
        endAt: newEndDate,
        createdAt: new Date(data.dateStart).getTime(),
        updatedAt: new Date(data.dateStart).getTime(),
        author: data.author,
        promo: data.currentPromo,
      });

      start = newStartDate;
    } else {
      let newStartDate = moment(start).add(data.duration, "minutes").toDate();
      if (counter % data.frequence === 0) {
        newStartDate = moment(start)
          .add(data.duration + data.pause, "minutes")
          .toDate();
      }

      let newEndDate = moment(start).add(data.duration, "minutes").toDate();
      await meleeModel.create({
        startAt: start,
        endAt: newEndDate,
        createdAt: new Date(data.dateStart).getTime(),
        updatedAt: new Date(data.dateStart).getTime(),
        author: data.author,
        promo: data.currentPromo,
      });

      start = newStartDate;
      counter += 1;
    };
  };

  const datas: any = await meleeModel.find({});
  return res.send({
    code: 200,
    message: "Melee created",
    data: datas,
  });
};

export async function deleteMelee(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  if (req.params.id) {
    const melee = await meleeModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (melee) {
      return res.send(melee);
    }
    return res.send({
      code: 404,
      error: "This Melee doesn't exist",
    });
  }

  return res.send({
    code: 400,
    error: "No id specified",
  });
}

export async function updateMelee(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }
  if (req.params.id) {
    const melee = await meleeModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { isReserved: true, user: req.body.user } }
    );

    if(!melee) {
      return res.send({
        code: 404,
        error: "This Melee doesn't exist",
      });
    };

    melee.startAt = moment(melee.startAt).add(1, "hours").toDate();

    const lastMelee = await lastMeleeModel.findOne({ login: req.body.user });
    if(!lastMelee) {

      const newData: any = new lastMeleeModel({
        login: req.body.user,
        melee: melee,
      });
      await newData.save();

    } else {

      lastMelee.melee = melee;
      await lastMelee.save();
      
    };
    if (melee) {
      return res.send(melee);
    }
    return res.send({
      code: 404,
      error: "This Melee doesn't exist",
    });
  }
}

export async function updateDetailsMelee(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  let data: any = req.body;
  let id = req.params.id;

  let melee = await meleeModel.findOne({ _id: id });

  if (!melee) {
    return res.send({
      code: 404,
      error: "This Melee doesn't exist",
    });
  }

  if (data.commentory) {
    melee.commentory = data.commentory;
  }

  data.tags = JSON.parse(data.tags);
  console.log(data.tags);
  if (data.tags && data.tags.length > 0) {
    melee.tags = data.tags;
  }

  await melee.save();

  return res.send({
    code: 200,
    message: "Melee updated",
    data: melee,
  });
}
