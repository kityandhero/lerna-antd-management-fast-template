import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildCurrentOperatorModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';

function collectModelBuilder() {
  appendExtraBuilder(buildAccessWayModel);
  appendExtraBuilder(buildCurrentOperatorModel);
  appendExtraBuilder(buildCurrentSystemModel);
}

collectModelBuilder();

export function prepareModel() {}
