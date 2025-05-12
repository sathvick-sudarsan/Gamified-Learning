import type {Mission} from "./schema";

export const linearSearch:Mission = {
  id:"lin-search",
  title:"Linear Search",
  prompt:"Write linear_search(arr,target) returning index or -1",
  starterCode:`def linear_search(arr, target):\n    # TODO\n    pass`,
  tests:[
    "assert linear_search([1,2,3],2)==1",
    "assert linear_search([5,4,3],5)==0",
    "assert linear_search([],1)==-1",
  ],
  timeLimit:60,
  reward:"50_coins",
};
