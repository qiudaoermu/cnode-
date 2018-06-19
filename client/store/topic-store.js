import {
  observable,
  toJS,
  computed,
  action,
  extendObservable,
} from 'mobx'
import  {topicSchema} from "../until/variable-define";
import  {get} from "../until/http";

const createTopic = (topic) =>{
    return Object.assign({},topicSchema,topic)
};
class Topic {
    constructor(data){
      extendObservable(this,data)
    }

    @observable syncing = false

}

class TopicStore {

  @observable topics;
  @observable details;
  @observable syncing;

  constructor(syncing=false,topics=[],details=[]){
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createTopic(topic)))
  }
  addTopic(topic){
      this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailsMap() {
    return this.details.reduce((result, topic) => {
      result[topic.id] = topic
      return result
    }, {})
  }


  @action fetchTopics(tab){
      return new Promise((resolve,reject)=>{
          this.syncing = true;
          this.topics = [];
          get('/topics',{
            mdrender:false,
            tab,
          }).then(resp =>{
            if(resp.success){
              resp.data.forEach(topic =>{
                this.addTopic(topic)
              });
              this.syncing = false;
              resolve()
            }else{
              reject()
            }
          }).catch(err=>{
            reject(err);
            this.syncing = false
          })
      })
  }

  @action getTopicDetail(id) {
    console.log('get topic id:', id) // eslint-disable-line
    return new Promise((resolve, reject) => {
      if (this.detailsMap[id]) {
        resolve(this.detailsMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then(resp => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data), true);
            this.details.push(topic);
            resolve(topic)
          } else {
            reject()
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}
export default TopicStore
