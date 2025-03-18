from django.shortcuts import render, redirect
from .models import Player, Tournament, Match

def index(request):
    return render(request, 'index.html')

def tournament(request):
    if request.method == 'POST':
        alias = request.POST.get('alias')
        if alias:
            player, created = Player.objects.get_or_create(alias=alias)
            tournament = Tournament.objects.first() or Tournament.objects.create(name="Pong Tournament")
            tournament.players.add(player)
            return redirect('tournament')
    tournament = Tournament.objects.first()
    matches = Match.objects.filter(tournament=tournament) if tournament else []
    return render(request, 'tournament.html', {'tournament': tournament, 'matches': matches})