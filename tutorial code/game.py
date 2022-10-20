from random import randint
from nltk.corpus import words
from collections import deque


def get_random_words():
    words_list = words.words()
    randIndex = randint(0, len(words_list))
    word = words_list[randIndex]
    return word

def check_answer(letters, answer):
    count = letters.count(answer)
    letters = letters.replace(answer, '')
    return letters
            

def main():
    players = ['Tom', 'Jenny', 'Mannie']  #provide
    
    
    word = get_random_words()
    tries = {}
    for name in players:
        tries[name] = 3
    
    
    
    loop = 0  
    while True:
        print(f'\n{word}')
        answer = str(input(f"{players[loop]}, please enter your guess: "))
        
        if answer == 'done':
            print("bye bye")
            continue
        else:
            result = check_answer(word, answer)
            if len(word) == len(result):
                tries[players[loop]] -= 1
            else:
                word = result
                
        print( f'{players[loop]}: {tries[players[loop]]}' )
        
        if tries[players[loop]] == 0:
            players.remove(players[loop])
        
        # move loop pointer in Players list
        if loop >= len(players)-1:
            loop = 0
        else: loop += 1
            
        
    
if __name__ == '__main__':
    main()
