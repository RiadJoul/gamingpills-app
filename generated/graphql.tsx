import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type BetsStats = {
  __typename?: 'BetsStats';
  active: Scalars['Float'];
  allTime: Scalars['Float'];
  today: Scalars['Float'];
};

/** Category of the game */
export enum Category {
  Sports = 'SPORTS'
}

export type Challenge = {
  __typename?: 'Challenge';
  awayPlayer?: Maybe<User>;
  awayScore?: Maybe<Scalars['Float']>;
  bet?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  game?: Maybe<Game>;
  gameMode?: Maybe<GameMode>;
  homePlayer: User;
  homeScore?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  mode?: Maybe<Mode>;
  platform?: Maybe<Platform>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  winner?: Maybe<User>;
};

export type ChallengeInput = {
  awayPlayerId?: InputMaybe<Scalars['String']>;
  bet: Scalars['Float'];
  comment: Scalars['String'];
  game: Scalars['Float'];
  gameMode: Scalars['Float'];
  platform: Platform;
};

export type ChallengesStats = {
  __typename?: 'ChallengesStats';
  activeChallenges: Scalars['Float'];
  disputedChallenges: Scalars['Float'];
  finishedChallenges: Scalars['Float'];
  pendingChallenges: Scalars['Float'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['String'];
  members: Array<User>;
  messages: Array<Message>;
  public: Scalars['Boolean'];
};

export type FeedResponse = {
  __typename?: 'FeedResponse';
  challenges: PaginatedChallenges;
  games: Array<Game>;
  myChallenges?: Maybe<Array<Challenge>>;
  onlineUsers: Array<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  active?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Category>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  gameModes?: Maybe<Array<GameMode>>;
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GameMode = {
  __typename?: 'GameMode';
  Game?: Maybe<Game>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ManageChallengesResponse = {
  __typename?: 'ManageChallengesResponse';
  activeChallenges: Array<Challenge>;
  challengesStats: ChallengesStats;
  disputedChallenges: Array<Challenge>;
  finishedChallenges: Array<Challenge>;
  pendingChallenges: Array<Challenge>;
};

export type ManagePlayersResponse = {
  __typename?: 'ManagePlayersResponse';
  activePlayers: Array<User>;
  bannedPlayers: Array<User>;
  bannedPlayersCount: Scalars['Float'];
  onlinePlayersCount: Scalars['Float'];
  pendingWithdraws: Array<Transaction>;
  pendingWithdrawsCount: Scalars['Float'];
  totalBalances: Scalars['Float'];
};

export type MatchesResponse = {
  __typename?: 'MatchesResponse';
  activeChallenges: Array<Challenge>;
  finishedChallenges: PaginatedChallenges;
  invites: Array<Challenge>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversation: Conversation;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  user: User;
};

/** Mode (OPEN or CHALLENGE) */
export enum Mode {
  Challenge = 'CHALLENGE',
  Open = 'OPEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  Challenge: GeneralResponse;
  JoinChallenge: GeneralResponse;
  addFunds: GeneralResponse;
  approveWithdraw: GeneralResponse;
  banPlayer: GeneralResponse;
  cancelChallenge: GeneralResponse;
  cancelPendingChallenge: GeneralResponse;
  changePassword: GeneralResponse;
  createGame: GeneralResponse;
  createGameMode: GeneralResponse;
  deductWallet: GeneralResponse;
  deleteGame: GeneralResponse;
  deleteGameMode: GeneralResponse;
  fundWallet: GeneralResponse;
  login: User;
  logout: Scalars['Boolean'];
  markNotificationAsRead: GeneralResponse;
  markNotificationsAsRead: GeneralResponse;
  register: SignUpResponse;
  rejectInvite: GeneralResponse;
  resetPassword: GeneralResponse;
  resolveChallenge: GeneralResponse;
  respondToResults: GeneralResponse;
  sendMessage: GeneralResponse;
  sendResetPasswordEmail: GeneralResponse;
  sendVerificationCode: GeneralResponse;
  unbanPlayer: GeneralResponse;
  updateGame: GeneralResponse;
  updateProfile: GeneralResponse;
  updateUser: GeneralResponse;
  uploadResults: GeneralResponse;
  verifyEmail: GeneralResponse;
  withdraw: GeneralResponse;
};


export type MutationChallengeArgs = {
  input: ChallengeInput;
};


export type MutationJoinChallengeArgs = {
  id: Scalars['String'];
};


export type MutationAddFundsArgs = {
  amount: Scalars['Float'];
};


export type MutationApproveWithdrawArgs = {
  id: Scalars['Float'];
};


export type MutationBanPlayerArgs = {
  id: Scalars['String'];
};


export type MutationCancelChallengeArgs = {
  id: Scalars['String'];
};


export type MutationCancelPendingChallengeArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateGameArgs = {
  file: Scalars['Upload'];
  gameModeName: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateGameModeArgs = {
  gameId: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationDeductWalletArgs = {
  amount: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationDeleteGameArgs = {
  gameId: Scalars['Float'];
};


export type MutationDeleteGameModeArgs = {
  gameModeId: Scalars['Float'];
};


export type MutationFundWalletArgs = {
  amount: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRejectInviteArgs = {
  id: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationResolveChallengeArgs = {
  id: Scalars['String'];
  winnerId: Scalars['String'];
};


export type MutationRespondToResultsArgs = {
  accepted: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationUnbanPlayerArgs = {
  id: Scalars['String'];
};


export type MutationUpdateGameArgs = {
  active: Scalars['Boolean'];
  gameId: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateUserArgs = {
  paypal: Scalars['String'];
  psnId: Scalars['String'];
  xboxId: Scalars['String'];
};


export type MutationUploadResultsArgs = {
  awayScore: Scalars['Float'];
  homeScore: Scalars['Float'];
  id: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationWithdrawArgs = {
  amount: Scalars['Float'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isRead?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  title: Scalars['String'];
  user: User;
};

export type PaginatedChallenges = {
  __typename?: 'PaginatedChallenges';
  challenges: Array<Challenge>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedTransactions = {
  __typename?: 'PaginatedTransactions';
  hasMore: Scalars['Boolean'];
  transactions: Array<Transaction>;
};

/** Platform of the challenge */
export enum Platform {
  Ps4 = 'PS4',
  Ps5 = 'PS5',
  Xboxone = 'XBOXONE',
  Xboxseries = 'XBOXSERIES'
}

export type PlayerInfoResponse = {
  __typename?: 'PlayerInfoResponse';
  challenges: Array<Challenge>;
  losses: Scalars['Float'];
  matches: Scalars['Float'];
  player: User;
  transactions: Array<Transaction>;
  wins: Scalars['Float'];
};

export type ProfitsStats = {
  __typename?: 'ProfitsStats';
  allTime: Scalars['Float'];
  thisMonth: Scalars['Float'];
  today: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  AuthenticatedUser?: Maybe<User>;
  activeGames?: Maybe<Array<Game>>;
  allGames?: Maybe<Array<Game>>;
  challenge?: Maybe<Challenge>;
  challenges: ManageChallengesResponse;
  feed?: Maybe<FeedResponse>;
  matches?: Maybe<MatchesResponse>;
  notifications: Array<Notification>;
  player: User;
  playerDisputedChallenges?: Maybe<Array<Challenge>>;
  playerInfo: PlayerInfoResponse;
  playerStats: UserStats;
  players: ManagePlayersResponse;
  privateMessages: Array<Message>;
  publicConversations: Conversation;
  publicMessages: Array<Message>;
  results: Scores;
  searchPlayer: Array<User>;
  stats: Stats;
  transactions: PaginatedTransactions;
  user?: Maybe<User>;
  users: Array<User>;
  wallets: Wallets;
};


export type QueryChallengeArgs = {
  id: Scalars['String'];
};


export type QueryFeedArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryMatchesArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryPlayerArgs = {
  id: Scalars['String'];
};


export type QueryPlayerInfoArgs = {
  id: Scalars['String'];
};


export type QueryPlayerStatsArgs = {
  id: Scalars['String'];
};


export type QueryPrivateMessagesArgs = {
  id: Scalars['String'];
};


export type QueryResultsArgs = {
  id: Scalars['String'];
};


export type QuerySearchPlayerArgs = {
  username: Scalars['String'];
};


export type QueryTransactionsArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

/** Role of the user */
export enum Role {
  Admin = 'ADMIN',
  Player = 'PLAYER'
}

export type Scores = {
  __typename?: 'Scores';
  awayScore: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  homeScore: Scalars['Float'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  errors?: Maybe<Array<FieldError>>;
  user: User;
};

export type Stats = {
  __typename?: 'Stats';
  betsStats?: Maybe<BetsStats>;
  challengesStats?: Maybe<ChallengesStats>;
  errors?: Maybe<Array<FieldError>>;
  profitsStats?: Maybe<ProfitsStats>;
  walletsStats?: Maybe<WalletsStats>;
};

/** status of a challenge */
export enum Status {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Disputed = 'DISPUTED',
  Finished = 'FINISHED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Notification;
  newPrivateMessage: Message;
  newPublicMessage: Message;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['Float'];
  status: Status;
  type: Type;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  Wallet?: Maybe<Wallet>;
  avatar?: Maybe<Scalars['String']>;
  banned?: Maybe<Scalars['Boolean']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen?: Maybe<Scalars['DateTime']>;
  password?: Maybe<Scalars['String']>;
  paypal?: Maybe<Scalars['String']>;
  psnId?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  xboxId?: Maybe<Scalars['String']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  losses: Scalars['Float'];
  matches: Scalars['Float'];
  wins: Scalars['Float'];
};

export type Wallet = {
  __typename?: 'Wallet';
  balance: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Wallets = {
  __typename?: 'Wallets';
  pendingWithdraws: Array<Transaction>;
  transactions: Array<Transaction>;
  users: Array<User>;
};

export type WalletsStats = {
  __typename?: 'WalletsStats';
  pendingAmountWithdraws: Scalars['Float'];
  totalBalance: Scalars['Float'];
  totalDeposit: Scalars['Float'];
};

/** Status of the transaction */
export enum Status {
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Type of the transaction */
export enum Type {
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE'
}

export type GeneralResponseFragment = { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ChallengeFragmentFragment = { __typename?: 'Challenge', id: string, mode?: Mode | null, status?: Status | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, psnId?: string | null, xboxId?: string | null, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, psnId?: string | null, xboxId?: string | null, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null, winner?: { __typename?: 'User', id?: string | null, username: string } | null };

export type GameFragmentFragment = { __typename?: 'Game', id: number, active?: boolean | null, name: string, category?: Category | null, cover?: string | null, createdAt?: any | null, updatedAt?: any | null };

export type UserFragmentFragment = { __typename?: 'User', id?: string | null, role?: Role | null, banned?: boolean | null, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, emailVerified?: boolean | null, paypal?: string | null, psnId?: string | null, xboxId?: string | null, avatar?: string | null, lastSeen?: any | null, birthDate?: any | null, createdAt?: any | null };

export type AddFundsMutationVariables = Exact<{
  amount: Scalars['Float'];
}>;


export type AddFundsMutation = { __typename?: 'Mutation', addFunds: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateGameMutationVariables = Exact<{
  gameName: Scalars['String'];
  gameModeName: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateGameModeMutationVariables = Exact<{
  gameId: Scalars['Float'];
  gameModeName: Scalars['String'];
}>;


export type CreateGameModeMutation = {
  deleteGameMode: any; __typename?: 'Mutation', createGameMode: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } 
};

export type ApproveWithdrawMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ApproveWithdrawMutation = { __typename?: 'Mutation', approveWithdraw: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type BanPlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BanPlayerMutation = { __typename?: 'Mutation', banPlayer: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CancelPendingChallengeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type CancelPendingChallengeMutation = { __typename?: 'Mutation', cancelPendingChallenge: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateChallengeMutationVariables = Exact<{
  game: Scalars['Float'];
  gameMode: Scalars['Float'];
  platform: Platform;
  bet: Scalars['Float'];
  comment: Scalars['String'];
  awayPlayerId?: InputMaybe<Scalars['String']>;
}>;


export type CreateChallengeMutation = { __typename?: 'Mutation', Challenge: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeductWalletMutationVariables = Exact<{
  userId: Scalars['String'];
  amount: Scalars['Float'];
}>;


export type DeductWalletMutation = { __typename?: 'Mutation', deductWallet: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteGameModeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteGameModeMutation = { __typename?: 'Mutation', deleteGameMode: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FundWalletMutationVariables = Exact<{
  userId: Scalars['String'];
  amount: Scalars['Float'];
}>;


export type FundWalletMutation = { __typename?: 'Mutation', fundWallet: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type JoinChallengeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type JoinChallengeMutation = { __typename?: 'Mutation', JoinChallenge: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id?: string | null, role?: Role | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MarkNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkNotificationsAsReadMutation = { __typename?: 'Mutation', markNotificationsAsRead: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RejectInviteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RejectInviteMutation = { __typename?: 'Mutation', rejectInvite: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResolveChallengeMutationVariables = Exact<{
  id: Scalars['String'];
  winnerId: Scalars['String'];
}>;


export type ResolveChallengeMutation = { __typename?: 'Mutation', resolveChallenge: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RespondToResultsMutationVariables = Exact<{
  id: Scalars['String'];
  accepted: Scalars['Boolean'];
}>;


export type RespondToResultsMutation = { __typename?: 'Mutation', respondToResults: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SendMessageMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SendResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordEmailMutation = { __typename?: 'Mutation', sendResetPasswordEmail: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SendVerificationCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerificationCodeMutation = { __typename?: 'Mutation', sendVerificationCode: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  birthDate: Scalars['DateTime'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'SignUpResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user: { __typename?: 'User', id?: string | null } } };

export type UnbanPlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnbanPlayerMutation = { __typename?: 'Mutation', unbanPlayer: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateProfileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateUserMutationVariables = Exact<{
  psnId: Scalars['String'];
  xboxId: Scalars['String'];
  paypal: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UploadResultsMutationVariables = Exact<{
  id: Scalars['String'];
  homeScore: Scalars['Float'];
  awayScore: Scalars['Float'];
}>;


export type UploadResultsMutation = { __typename?: 'Mutation', uploadResults: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type WithdrawMutationVariables = Exact<{
  amount: Scalars['Float'];
}>;


export type WithdrawMutation = { __typename?: 'Mutation', withdraw: { __typename?: 'GeneralResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'Query', AuthenticatedUser?: { __typename?: 'User', id?: string | null, role?: Role | null, banned?: boolean | null, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, emailVerified?: boolean | null, paypal?: string | null, psnId?: string | null, xboxId?: string | null, avatar?: string | null, lastSeen?: any | null, birthDate?: any | null, Wallet?: { __typename?: 'Wallet', balance: number } | null } | null };

export type AllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGamesQuery = { __typename?: 'Query', allGames?: Array<{ __typename?: 'Game', id: number, name: string, active?: boolean | null, category?: Category | null, cover?: string | null, gameModes?: Array<{ __typename?: 'GameMode', id: number, name: string }> | null }> | null };

export type ChallengeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ChallengeQuery = { __typename?: 'Query', challenge?: { __typename?: 'Challenge', id: string, mode?: Mode | null, status?: Status | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, psnId?: string | null, xboxId?: string | null, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, psnId?: string | null, xboxId?: string | null, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null, winner?: { __typename?: 'User', id?: string | null, username: string } | null } | null };

export type ChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type ChallengesQuery = { __typename?: 'Query', challenges: { __typename?: 'ManageChallengesResponse', activeChallenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, bet?: number | null, createdAt?: any | null, homePlayer: { __typename?: 'User', username: string } }>, pendingChallenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, bet?: number | null, createdAt?: any | null, homePlayer: { __typename?: 'User', username: string } }>, disputedChallenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, bet?: number | null, createdAt?: any | null, homePlayer: { __typename?: 'User', username: string } }>, finishedChallenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, bet?: number | null, createdAt?: any | null, homePlayer: { __typename?: 'User', username: string } }>, challengesStats: { __typename?: 'ChallengesStats', activeChallenges: number, pendingChallenges: number, disputedChallenges: number, finishedChallenges: number } } };

export type PlayerDisputedChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerDisputedChallengesQuery = { __typename?: 'Query', playerDisputedChallenges?: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, mode?: Mode | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }> | null };

export type FeedQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type FeedQuery = { __typename?: 'Query', feed?: { __typename?: 'FeedResponse', onlineUsers: Array<{ __typename?: 'User', id?: string | null, username: string, avatar?: string | null }>, games: Array<{ __typename?: 'Game', id: number, name: string, category?: Category | null, cover?: string | null }>, myChallenges?: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, mode?: Mode | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }> | null, challenges: { __typename?: 'PaginatedChallenges', hasMore: boolean, challenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, mode?: Mode | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }> } } | null };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', activeGames?: Array<{ __typename?: 'Game', id: number, name: string, category?: Category | null, gameModes?: Array<{ __typename?: 'GameMode', id: number, name: string }> | null }> | null };

export type MatchesQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type MatchesQuery = { __typename?: 'Query', matches?: { __typename?: 'MatchesResponse', activeChallenges: Array<{ __typename?: 'Challenge', id: string, mode?: Mode | null, status?: Status | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }>, invites: Array<{ __typename?: 'Challenge', id: string, mode?: Mode | null, status?: Status | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }>, finishedChallenges: { __typename?: 'PaginatedChallenges', hasMore: boolean, challenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, mode?: Mode | null, homeScore?: number | null, awayScore?: number | null, bet?: number | null, platform?: Platform | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null, homePlayer: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null }, awayPlayer?: { __typename?: 'User', id?: string | null, username: string, avatar?: string | null } | null, game?: { __typename?: 'Game', id: number, name: string } | null, gameMode?: { __typename?: 'GameMode', id: number, name: string } | null }> } } | null };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: string, title: string, message: string, isRead?: boolean | null, createdAt?: any | null }> };

export type PlayerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerQuery = { __typename?: 'Query', player: { __typename?: 'User', id?: string | null, role?: Role | null, banned?: boolean | null, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, emailVerified?: boolean | null, paypal?: string | null, psnId?: string | null, xboxId?: string | null, avatar?: string | null, lastSeen?: any | null, birthDate?: any | null, createdAt?: any | null } };

export type PlayerInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerInfoQuery = { __typename?: 'Query', playerInfo: { __typename?: 'PlayerInfoResponse', player: { __typename?: 'User', id?: string | null, role?: Role | null, banned?: boolean | null, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, emailVerified?: boolean | null, paypal?: string | null, psnId?: string | null, xboxId?: string | null, avatar?: string | null, lastSeen?: any | null, birthDate?: any | null, createdAt?: any | null, Wallet?: { __typename?: 'Wallet', balance: number } | null }, challenges: Array<{ __typename?: 'Challenge', id: string, status?: Status | null, homeScore?: number | null, bet?: number | null, awayScore?: number | null, createdAt?: any | null, homePlayer: { __typename?: 'User', username: string }, awayPlayer?: { __typename?: 'User', username: string } | null }>, transactions: Array<{ __typename?: 'Transaction', id: number, status: Status, type: Type, amount: number, description: string, createdAt?: any | null }> } };

export type PlayerStatsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlayerStatsQuery = { __typename?: 'Query', playerStats: { __typename?: 'UserStats', matches: number, wins: number, losses: number } };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: { __typename?: 'ManagePlayersResponse', onlinePlayersCount: number, totalBalances: number, pendingWithdrawsCount: number, bannedPlayersCount: number, activePlayers: Array<{ __typename?: 'User', id?: string | null, avatar?: string | null, banned?: boolean | null, username: string, lastSeen?: any | null, Wallet?: { __typename?: 'Wallet', id: number, balance: number } | null }>, bannedPlayers: Array<{ __typename?: 'User', id?: string | null, avatar?: string | null, banned?: boolean | null, username: string, Wallet?: { __typename?: 'Wallet', id: number, balance: number } | null }>, pendingWithdraws: Array<{ __typename?: 'Transaction', id: number, status: Status, amount: number, createdAt?: any | null, user?: { __typename?: 'User', username: string } | null }> } };

export type PrivateMessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PrivateMessagesQuery = { __typename?: 'Query', privateMessages: Array<{ __typename?: 'Message', id: string, content: string, createdAt?: any | null, user: { __typename?: 'User', username: string, role?: Role | null } }> };

export type PublicMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicMessagesQuery = { __typename?: 'Query', publicMessages: Array<{ __typename?: 'Message', id: string, content: string, createdAt?: any | null, user: { __typename?: 'User', username: string, role?: Role | null } }> };

export type ResultsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ResultsQuery = { __typename?: 'Query', results: { __typename?: 'Scores', id: number, homeScore: number, awayScore: number, createdAt: any, updatedAt: any } };

export type SearchPlayerQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchPlayerQuery = { __typename?: 'Query', searchPlayer: Array<{ __typename?: 'User', id?: string | null, banned?: boolean | null, username: string, avatar?: string | null, lastSeen?: any | null }> };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'Query', stats: { __typename?: 'Stats', betsStats?: { __typename?: 'BetsStats', active: number, today: number, allTime: number } | null, challengesStats?: { __typename?: 'ChallengesStats', pendingChallenges: number, activeChallenges: number, disputedChallenges: number, finishedChallenges: number } | null, profitsStats?: { __typename?: 'ProfitsStats', today: number, thisMonth: number, allTime: number } | null, walletsStats?: { __typename?: 'WalletsStats', totalBalance: number, totalDeposit: number, pendingAmountWithdraws: number } | null } };

export type TransactionsQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'PaginatedTransactions', hasMore: boolean, transactions: Array<{ __typename?: 'Transaction', id: number, status: Status, type: Type, amount: number, description: string, createdAt?: any | null }> } };

export type WalletsQueryVariables = Exact<{ [key: string]: never; }>;


export type WalletsQuery = { __typename?: 'Query', wallets: { __typename?: 'Wallets', users: Array<{ __typename?: 'User', id?: string | null, username: string, Wallet?: { __typename?: 'Wallet', balance: number } | null }>, transactions: Array<{ __typename?: 'Transaction', id: number, status: Status, amount: number }>, pendingWithdraws: Array<{ __typename?: 'Transaction', id: number, status: Status, amount: number, user?: { __typename?: 'User', username: string, paypal?: string | null } | null }> } };

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'Notification', id: string, title: string, message: string, isRead?: boolean | null, createdAt?: any | null } };

export type NewPrivateMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewPrivateMessageSubscription = { __typename?: 'Subscription', newPrivateMessage: { __typename?: 'Message', id: string, content: string, createdAt?: any | null, user: { __typename?: 'User', username: string, role?: Role | null } } };

export type NewPublicMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewPublicMessageSubscription = { __typename?: 'Subscription', newPublicMessage: { __typename?: 'Message', id: string, content: string, createdAt?: any | null, user: { __typename?: 'User', username: string, role?: Role | null } } };

export const GeneralResponseFragmentDoc = gql`
    fragment GeneralResponse on GeneralResponse {
  errors {
    field
    message
  }
  success
}
    `;
export const ChallengeFragmentFragmentDoc = gql`
    fragment challengeFragment on Challenge {
  id
  mode
  status
  homePlayer {
    id
    username
    psnId
    xboxId
    avatar
  }
  awayPlayer {
    id
    username
    psnId
    xboxId
    avatar
  }
  homeScore
  awayScore
  game {
    id
    name
  }
  gameMode {
    id
    name
  }
  bet
  platform
  comment
  winner {
    id
    username
  }
  createdAt
  updatedAt
}
    `;
export const GameFragmentFragmentDoc = gql`
    fragment GameFragment on Game {
  id
  active
  name
  category
  cover
  createdAt
  updatedAt
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  role
  banned
  username
  firstName
  lastName
  email
  emailVerified
  paypal
  psnId
  xboxId
  avatar
  lastSeen
  birthDate
  createdAt
}
    `;
export const AddFundsDocument = gql`
    mutation AddFunds($amount: Float!) {
  addFunds(amount: $amount) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useAddFundsMutation() {
  return Urql.useMutation<AddFundsMutation, AddFundsMutationVariables>(AddFundsDocument);
};
export const CreateGameDocument = gql`
    mutation CreateGame($gameName: String!, $gameModeName: String!, $file: Upload!) {
  createGame(name: $gameName, gameModeName: $gameModeName, file: $file) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useCreateGameMutation() {
  return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument);
};
export const CreateGameModeDocument = gql`
    mutation CreateGameMode($gameId: Float!, $gameModeName: String!) {
  createGameMode(gameId: $gameId, name: $gameModeName) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useCreateGameModeMutation() {
  return Urql.useMutation<CreateGameModeMutation, CreateGameModeMutationVariables>(CreateGameModeDocument);
};
export const ApproveWithdrawDocument = gql`
    mutation ApproveWithdraw($id: Float!) {
  approveWithdraw(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useApproveWithdrawMutation() {
  return Urql.useMutation<ApproveWithdrawMutation, ApproveWithdrawMutationVariables>(ApproveWithdrawDocument);
};
export const BanPlayerDocument = gql`
    mutation BanPlayer($id: String!) {
  banPlayer(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useBanPlayerMutation() {
  return Urql.useMutation<BanPlayerMutation, BanPlayerMutationVariables>(BanPlayerDocument);
};
export const CancelPendingChallengeDocument = gql`
    mutation cancelPendingChallenge($id: String!) {
  cancelPendingChallenge(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useCancelPendingChallengeMutation() {
  return Urql.useMutation<CancelPendingChallengeMutation, CancelPendingChallengeMutationVariables>(CancelPendingChallengeDocument);
};
export const CreateChallengeDocument = gql`
    mutation createChallenge($game: Float!, $gameMode: Float!, $platform: Platform!, $bet: Float!, $comment: String!, $awayPlayerId: String) {
  Challenge(
    input: {game: $game, gameMode: $gameMode, platform: $platform, bet: $bet, comment: $comment, awayPlayerId: $awayPlayerId}
  ) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useCreateChallengeMutation() {
  return Urql.useMutation<CreateChallengeMutation, CreateChallengeMutationVariables>(CreateChallengeDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(
    password: $password
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const DeductWalletDocument = gql`
    mutation DeductWallet($userId: String!, $amount: Float!) {
  deductWallet(userId: $userId, amount: $amount) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useDeductWalletMutation() {
  return Urql.useMutation<DeductWalletMutation, DeductWalletMutationVariables>(DeductWalletDocument);
};
export const DeleteGameDocument = gql`
    mutation DeleteGame($id: Float!) {
  deleteGame(gameId: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useDeleteGameMutation() {
  return Urql.useMutation<DeleteGameMutation, DeleteGameMutationVariables>(DeleteGameDocument);
};
export const DeleteGameModeDocument = gql`
    mutation DeleteGameMode($id: Float!) {
  deleteGameMode(gameModeId: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useDeleteGameModeMutation() {
  return Urql.useMutation<DeleteGameModeMutation, DeleteGameModeMutationVariables>(DeleteGameModeDocument);
};
export const FundWalletDocument = gql`
    mutation FundWallet($userId: String!, $amount: Float!) {
  fundWallet(userId: $userId, amount: $amount) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useFundWalletMutation() {
  return Urql.useMutation<FundWalletMutation, FundWalletMutationVariables>(FundWalletDocument);
};
export const JoinChallengeDocument = gql`
    mutation JoinChallenge($id: String!) {
  JoinChallenge(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useJoinChallengeMutation() {
  return Urql.useMutation<JoinChallengeMutation, JoinChallengeMutationVariables>(JoinChallengeDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    role
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: String!) {
  markNotificationAsRead(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useMarkNotificationAsReadMutation() {
  return Urql.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument);
};
export const MarkNotificationsAsReadDocument = gql`
    mutation MarkNotificationsAsRead {
  markNotificationsAsRead {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useMarkNotificationsAsReadMutation() {
  return Urql.useMutation<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>(MarkNotificationsAsReadDocument);
};
export const RejectInviteDocument = gql`
    mutation RejectInvite($id: String!) {
  rejectInvite(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useRejectInviteMutation() {
  return Urql.useMutation<RejectInviteMutation, RejectInviteMutationVariables>(RejectInviteDocument);
};
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $newPassword: String!, $confirmPassword: String!) {
  resetPassword(
    token: $token
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const ResolveChallengeDocument = gql`
    mutation ResolveChallenge($id: String!, $winnerId: String!) {
  resolveChallenge(id: $id, winnerId: $winnerId) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useResolveChallengeMutation() {
  return Urql.useMutation<ResolveChallengeMutation, ResolveChallengeMutationVariables>(ResolveChallengeDocument);
};
export const RespondToResultsDocument = gql`
    mutation RespondToResults($id: String!, $accepted: Boolean!) {
  respondToResults(id: $id, accepted: $accepted) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useRespondToResultsMutation() {
  return Urql.useMutation<RespondToResultsMutation, RespondToResultsMutationVariables>(RespondToResultsDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($id: String, $content: String!) {
  sendMessage(id: $id, content: $content) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const SendResetPasswordEmailDocument = gql`
    mutation SendResetPasswordEmail($email: String!) {
  sendResetPasswordEmail(email: $email) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useSendResetPasswordEmailMutation() {
  return Urql.useMutation<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>(SendResetPasswordEmailDocument);
};
export const SendVerificationCodeDocument = gql`
    mutation SendVerificationCode {
  sendVerificationCode {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useSendVerificationCodeMutation() {
  return Urql.useMutation<SendVerificationCodeMutation, SendVerificationCodeMutationVariables>(SendVerificationCodeDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!, $birthDate: DateTime!) {
  register(
    username: $username
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    birthDate: $birthDate
  ) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UnbanPlayerDocument = gql`
    mutation UnbanPlayer($id: String!) {
  unbanPlayer(id: $id) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useUnbanPlayerMutation() {
  return Urql.useMutation<UnbanPlayerMutation, UnbanPlayerMutationVariables>(UnbanPlayerDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($file: Upload!) {
  updateProfile(file: $file) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($psnId: String!, $xboxId: String!, $paypal: String!) {
  updateUser(psnId: $psnId, xboxId: $xboxId, paypal: $paypal) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const UploadResultsDocument = gql`
    mutation UploadResults($id: String!, $homeScore: Float!, $awayScore: Float!) {
  uploadResults(id: $id, homeScore: $homeScore, awayScore: $awayScore) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useUploadResultsMutation() {
  return Urql.useMutation<UploadResultsMutation, UploadResultsMutationVariables>(UploadResultsDocument);
};
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useVerifyEmailMutation() {
  return Urql.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument);
};
export const WithdrawDocument = gql`
    mutation Withdraw($amount: Float!) {
  withdraw(amount: $amount) {
    ...GeneralResponse
  }
}
    ${GeneralResponseFragmentDoc}`;

export function useWithdrawMutation() {
  return Urql.useMutation<WithdrawMutation, WithdrawMutationVariables>(WithdrawDocument);
};
export const AuthenticatedUserDocument = gql`
    query AuthenticatedUser {
  AuthenticatedUser {
    id
    role
    banned
    username
    firstName
    lastName
    email
    emailVerified
    paypal
    psnId
    xboxId
    avatar
    lastSeen
    birthDate
    Wallet {
      balance
    }
  }
}
    `;

export function useAuthenticatedUserQuery(options?: Omit<Urql.UseQueryArgs<AuthenticatedUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AuthenticatedUserQuery>({ query: AuthenticatedUserDocument, ...options });
};
export const AllGamesDocument = gql`
    query AllGames {
  allGames {
    id
    name
    active
    category
    cover
    gameModes {
      id
      name
    }
  }
}
    `;

export function useAllGamesQuery(options?: Omit<Urql.UseQueryArgs<AllGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<AllGamesQuery>({ query: AllGamesDocument, ...options });
};
export const ChallengeDocument = gql`
    query Challenge($id: String!) {
  challenge(id: $id) {
    ...challengeFragment
  }
}
    ${ChallengeFragmentFragmentDoc}`;

export function useChallengeQuery(options: Omit<Urql.UseQueryArgs<ChallengeQueryVariables>, 'query'>) {
  return Urql.useQuery<ChallengeQuery>({ query: ChallengeDocument, ...options });
};
export const ChallengesDocument = gql`
    query Challenges {
  challenges {
    activeChallenges {
      id
      status
      homePlayer {
        username
      }
      bet
      createdAt
    }
    pendingChallenges {
      id
      status
      homePlayer {
        username
      }
      bet
      createdAt
    }
    disputedChallenges {
      id
      status
      homePlayer {
        username
      }
      bet
      createdAt
    }
    finishedChallenges {
      id
      status
      homePlayer {
        username
      }
      bet
      createdAt
    }
    challengesStats {
      activeChallenges
      pendingChallenges
      disputedChallenges
      finishedChallenges
    }
  }
}
    `;

export function useChallengesQuery(options?: Omit<Urql.UseQueryArgs<ChallengesQueryVariables>, 'query'>) {
  return Urql.useQuery<ChallengesQuery>({ query: ChallengesDocument, ...options });
};
export const PlayerDisputedChallengesDocument = gql`
    query PlayerDisputedChallenges {
  playerDisputedChallenges {
    id
    status
    mode
    homePlayer {
      id
      username
      avatar
    }
    awayPlayer {
      id
      username
      avatar
    }
    homeScore
    awayScore
    game {
      id
      name
    }
    gameMode {
      id
      name
    }
    bet
    platform
    comment
    createdAt
    updatedAt
  }
}
    `;

export function usePlayerDisputedChallengesQuery(options?: Omit<Urql.UseQueryArgs<PlayerDisputedChallengesQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayerDisputedChallengesQuery>({ query: PlayerDisputedChallengesDocument, ...options });
};
export const FeedDocument = gql`
    query Feed($skip: Float!, $take: Float!) {
  feed(skip: $skip, take: $take) {
    onlineUsers {
      id
      username
      avatar
    }
    games {
      id
      name
      category
      cover
    }
    myChallenges {
      id
      status
      mode
      homePlayer {
        id
        username
        avatar
      }
      awayPlayer {
        id
        username
        avatar
      }
      homeScore
      awayScore
      game {
        id
        name
      }
      gameMode {
        id
        name
      }
      bet
      platform
      comment
      createdAt
      updatedAt
    }
    challenges {
      challenges {
        id
        status
        mode
        homePlayer {
          id
          username
          avatar
        }
        awayPlayer {
          id
          username
          avatar
        }
        homeScore
        awayScore
        game {
          id
          name
        }
        gameMode {
          id
          name
        }
        bet
        platform
        comment
        createdAt
        updatedAt
      }
      hasMore
    }
  }
}
    `;

export function useFeedQuery(options: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedQuery>({ query: FeedDocument, ...options });
};
export const GamesDocument = gql`
    query Games {
  activeGames {
    id
    name
    category
    gameModes {
      id
      name
    }
  }
}
    `;

export function useGamesQuery(options?: Omit<Urql.UseQueryArgs<GamesQueryVariables>, 'query'>) {
  return Urql.useQuery<GamesQuery>({ query: GamesDocument, ...options });
};
export const MatchesDocument = gql`
    query Matches($skip: Float!, $take: Float!) {
  matches(skip: $skip, take: $take) {
    activeChallenges {
      id
      mode
      status
      homePlayer {
        id
        username
        avatar
      }
      awayPlayer {
        id
        username
        avatar
      }
      homeScore
      awayScore
      game {
        id
        name
      }
      gameMode {
        id
        name
      }
      bet
      platform
      comment
      createdAt
      updatedAt
    }
    invites {
      id
      mode
      status
      homePlayer {
        id
        username
        avatar
      }
      awayPlayer {
        id
        username
        avatar
      }
      game {
        id
        name
      }
      gameMode {
        id
        name
      }
      bet
      platform
      comment
      createdAt
      updatedAt
    }
    finishedChallenges {
      challenges {
        id
        status
        mode
        homePlayer {
          id
          username
          avatar
        }
        awayPlayer {
          id
          username
          avatar
        }
        homeScore
        awayScore
        game {
          id
          name
        }
        gameMode {
          id
          name
        }
        bet
        platform
        comment
        createdAt
        updatedAt
      }
      hasMore
    }
  }
}
    `;

export function useMatchesQuery(options: Omit<Urql.UseQueryArgs<MatchesQueryVariables>, 'query'>) {
  return Urql.useQuery<MatchesQuery>({ query: MatchesDocument, ...options });
};
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    title
    message
    isRead
    createdAt
  }
}
    `;

export function useNotificationsQuery(options?: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<NotificationsQuery>({ query: NotificationsDocument, ...options });
};
export const PlayerDocument = gql`
    query Player($id: String!) {
  player(id: $id) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function usePlayerQuery(options: Omit<Urql.UseQueryArgs<PlayerQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayerQuery>({ query: PlayerDocument, ...options });
};
export const PlayerInfoDocument = gql`
    query PlayerInfo($id: String!) {
  playerInfo(id: $id) {
    player {
      id
      role
      banned
      username
      firstName
      lastName
      email
      emailVerified
      paypal
      psnId
      xboxId
      avatar
      lastSeen
      birthDate
      createdAt
      Wallet {
        balance
      }
    }
    challenges {
      id
      status
      homePlayer {
        username
      }
      homeScore
      bet
      awayPlayer {
        username
      }
      awayScore
      createdAt
    }
    transactions {
      id
      status
      type
      amount
      description
      createdAt
    }
  }
}
    `;

export function usePlayerInfoQuery(options: Omit<Urql.UseQueryArgs<PlayerInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayerInfoQuery>({ query: PlayerInfoDocument, ...options });
};
export const PlayerStatsDocument = gql`
    query PlayerStats($id: String!) {
  playerStats(id: $id) {
    matches
    wins
    losses
  }
}
    `;

export function usePlayerStatsQuery(options: Omit<Urql.UseQueryArgs<PlayerStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayerStatsQuery>({ query: PlayerStatsDocument, ...options });
};
export const PlayersDocument = gql`
    query Players {
  players {
    activePlayers {
      id
      avatar
      banned
      username
      Wallet {
        id
        balance
      }
      lastSeen
    }
    bannedPlayers {
      id
      avatar
      banned
      username
      Wallet {
        id
        balance
      }
    }
    pendingWithdraws {
      id
      status
      amount
      createdAt
      user {
        username
      }
    }
    onlinePlayersCount
    totalBalances
    pendingWithdrawsCount
    bannedPlayersCount
  }
}
    `;

export function usePlayersQuery(options?: Omit<Urql.UseQueryArgs<PlayersQueryVariables>, 'query'>) {
  return Urql.useQuery<PlayersQuery>({ query: PlayersDocument, ...options });
};
export const PrivateMessagesDocument = gql`
    query PrivateMessages($id: String!) {
  privateMessages(id: $id) {
    id
    content
    user {
      username
      role
    }
    createdAt
  }
}
    `;

export function usePrivateMessagesQuery(options: Omit<Urql.UseQueryArgs<PrivateMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<PrivateMessagesQuery>({ query: PrivateMessagesDocument, ...options });
};
export const PublicMessagesDocument = gql`
    query PublicMessages {
  publicMessages {
    id
    content
    user {
      username
      role
    }
    createdAt
  }
}
    `;

export function usePublicMessagesQuery(options?: Omit<Urql.UseQueryArgs<PublicMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicMessagesQuery>({ query: PublicMessagesDocument, ...options });
};
export const ResultsDocument = gql`
    query Results($id: String!) {
  results(id: $id) {
    id
    homeScore
    awayScore
    createdAt
    updatedAt
  }
}
    `;

export function useResultsQuery(options: Omit<Urql.UseQueryArgs<ResultsQueryVariables>, 'query'>) {
  return Urql.useQuery<ResultsQuery>({ query: ResultsDocument, ...options });
};
export const SearchPlayerDocument = gql`
    query SearchPlayer($username: String!) {
  searchPlayer(username: $username) {
    id
    banned
    username
    avatar
    lastSeen
  }
}
    `;

export function useSearchPlayerQuery(options: Omit<Urql.UseQueryArgs<SearchPlayerQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchPlayerQuery>({ query: SearchPlayerDocument, ...options });
};
export const StatsDocument = gql`
    query Stats {
  stats {
    betsStats {
      active
      today
      allTime
    }
    challengesStats {
      pendingChallenges
      activeChallenges
      disputedChallenges
      finishedChallenges
    }
    profitsStats {
      today
      thisMonth
      allTime
    }
    walletsStats {
      totalBalance
      totalDeposit
      pendingAmountWithdraws
    }
  }
}
    `;

export function useStatsQuery(options?: Omit<Urql.UseQueryArgs<StatsQueryVariables>, 'query'>) {
  return Urql.useQuery<StatsQuery>({ query: StatsDocument, ...options });
};
export const TransactionsDocument = gql`
    query Transactions($skip: Float!, $take: Float!) {
  transactions(skip: $skip, take: $take) {
    transactions {
      id
      status
      type
      amount
      description
      createdAt
    }
    hasMore
  }
}
    `;

export function useTransactionsQuery(options: Omit<Urql.UseQueryArgs<TransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<TransactionsQuery>({ query: TransactionsDocument, ...options });
};
export const WalletsDocument = gql`
    query Wallets {
  wallets {
    users {
      id
      username
      Wallet {
        balance
      }
    }
    transactions {
      id
      status
      amount
    }
    pendingWithdraws {
      id
      status
      amount
      user {
        username
        paypal
      }
    }
  }
}
    `;

export function useWalletsQuery(options?: Omit<Urql.UseQueryArgs<WalletsQueryVariables>, 'query'>) {
  return Urql.useQuery<WalletsQuery>({ query: WalletsDocument, ...options });
};
export const NewNotificationDocument = gql`
    subscription NewNotification {
  newNotification {
    id
    title
    message
    isRead
    createdAt
  }
}
    `;

export function useNewNotificationSubscription<TData = NewNotificationSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewNotificationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewNotificationSubscription, TData>) {
  return Urql.useSubscription<NewNotificationSubscription, TData, NewNotificationSubscriptionVariables>({ query: NewNotificationDocument, ...options }, handler);
};
export const NewPrivateMessageDocument = gql`
    subscription NewPrivateMessage {
  newPrivateMessage {
    id
    user {
      username
      role
    }
    content
    createdAt
  }
}
    `;

export function useNewPrivateMessageSubscription<TData = NewPrivateMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewPrivateMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewPrivateMessageSubscription, TData>) {
  return Urql.useSubscription<NewPrivateMessageSubscription, TData, NewPrivateMessageSubscriptionVariables>({ query: NewPrivateMessageDocument, ...options }, handler);
};
export const NewPublicMessageDocument = gql`
    subscription NewPublicMessage {
  newPublicMessage {
    id
    user {
      username
      role
    }
    content
    createdAt
  }
}
    `;

export function useNewPublicMessageSubscription<TData = NewPublicMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewPublicMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewPublicMessageSubscription, TData>) {
  return Urql.useSubscription<NewPublicMessageSubscription, TData, NewPublicMessageSubscriptionVariables>({ query: NewPublicMessageDocument, ...options }, handler);
};