import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

const AccountInput = new GraphQLInputObjectType({
    name: "AccountInput",
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

export default AccountInput;
