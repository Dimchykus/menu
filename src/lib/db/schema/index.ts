import * as user from "./user";
import * as menu from "./menu";
import * as subscription from "./subscription";

const schema = { ...user, ...menu, ...subscription };

export default schema;
