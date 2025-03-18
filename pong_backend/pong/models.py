from django.db import models

class Player(models.Model):
    alias = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.alias

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    players = models.ManyToManyField(Player)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    player1 = models.ForeignKey(Player, related_name='player1_matches', on_delete=models.CASCADE)
    player2 = models.ForeignKey(Player, related_name='player2_matches', on_delete=models.CASCADE)
    winner = models.ForeignKey(Player, related_name='won_matches', null=True, blank=True, on_delete=models.SET_NULL)
    order = models.IntegerField()

    def __str__(self):
        return f"{self.player1} vs {self.player2}"