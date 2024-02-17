import { EVENT_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createEventRegistrationDB = async (model, data) => {
  try {
    const result = await model(data).save();
    if (result !== null) {
      console.log(EVENT_MESSAGES.EVENT_CREATED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_CREATED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_CREATING_EVENT, (data, error));
    return false;
  }
};

const readEventRegistrationDB = async (model, query, fields) => {
  try {
    const result = await model.find(query).select(fields);
    if (result.length > 0) {
      console.log(EVENT_MESSAGES.EVENT_READ);
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_READING_EVENT, {
      query,
      error,
    });
    return false;
  }
};

const updateEventRegistrationDB = async (model, query, data, fields) => {
  try {
    const result = await model
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .select(fields);
    if (result) {
      console.log(EVENT_MESSAGES.EVENT_UPDATED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_UPDATED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_UPDATING_EVENT, (query, data, error));
    return false;
  }
};

const deleteEventRegistrationDB = async (model, query) => {
  try {
    const result = await model.findOneAndDelete(query);

    if (result) {
      console.log(EVENT_MESSAGES.EVENT_DELETED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_DELETED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_DELETING_EVENT, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createEventRegistrationDB as CREATEEVENTREGISTRATIONDB,
  readEventRegistrationDB as READEVENTREGISTRATIONDB,
  updateEventRegistrationDB as UPDATEEVENTREGISTRATIONDB,
  deleteEventRegistrationDB as DELETEEVENTREGISTRATIONDB,
};
