import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  stable var highScores : [(Text, Nat)] = [];
  let scores = HashMap.fromIter<Text, Nat>(
    highScores.vals(), 16, Text.equal, Text.hash
  );

  public query func getHighScore(user : Text) : async Nat {
    switch (scores.get(user)) {
      case (?score) score;
      case null 0;
    }
  };

  public func updateScore(user : Text, score : Nat) : async () {
    let current = switch (scores.get(user)) {
      case (?s) s;
      case null 0;
    };
    if (score > current) {
      scores.put(user, score);
    }
  };

  public func resetScore(user : Text) : async () {
    scores.put(user, 0);
  };

  system func preupgrade() { highScores := Iter.toArray(scores.entries()); };
  system func postupgrade() { highScores := []; }
}