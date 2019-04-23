import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Skill } from '../models/skill';

import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class SkillData {
    constructor(
        public events: Events,
        public storage: Storage
    ) {    

    }

    getCategories(skills){
         let sortedCategories = _.sortedUniq(skills.map(skill => skill.categoryId));
         return sortedCategories; 
    }

    getSkillsByCategory(skills, categoryId){
        let filteredSkills = _.filter(skills, {'categoryId' : categoryId});
        return filteredSkills; 
    }

    getCategoryNameOnSkills(filteredSkills){
        return filteredSkills[0].categoryName;
    }

}