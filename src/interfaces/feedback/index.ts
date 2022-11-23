export interface IFeedbackUpdated {
  feedback: string;
}

export interface IFeedbackRequest extends IFeedbackUpdated {
  name: string;
  email: string;
}

export interface IFeedbackResponse {
  id: string;
}

export interface IUser {
  id: string;
  type: string;
}
