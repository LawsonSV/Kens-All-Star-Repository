import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment($appointmentText: String!) {
    addAppointment(appointmentText: $appointmentText) {
      _id
      appointmentText
      appointmentAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($appointmentId: ID!, $commentText: String!) {
    addComment(appointmentId: $appointmentId, commentText: $commentText) {
      _id
      appointmentText
      appointmentAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
