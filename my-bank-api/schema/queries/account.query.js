import { GraphQLInt, GraphQLList } from "graphql";
import Account from "../types/Account.js";
import AccountResolver from "../resolvers/account.resolvers.js";

const accountQueries = {
    getAccounts: {
        type: GraphQLList(Account),
        resolve: () => AccountResolver.getAccounts(),
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt,
            },
        },
        resolve: (_, args) => AccountResolver.getAccount(args.id),
    },
};

export default accountQueries;
