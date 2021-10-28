import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

import accountQueries from "../queries/account.query.js";

const Account = new GraphQLObjectType({
    name: "Account",
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        },
        balance: {
            type: GraphQLFloat,
        },
    }),
});

export default Account;
