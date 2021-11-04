# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
#
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#
#

table_available = ['2','4','6','8','10']


class ActionSearchTable(Action):

    def name(self) -> Text:
        return "search_for_table"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entities = tracker.latest_message['entities']
        print(entities)

        for e in range(len(entities)):
            if entities[e]['entity'] == 'person':
                name = entities[e]


        if name['value'] in table_available:

            dispatcher.utter_message(text=" Yes we have a table available for " + name['value'] + " poeple")

        else:
            dispatcher.utter_message(text=" we don't have any available table for " + name['value'] + " do you mind to wait !")
        return []

class ActionSearchRestaurant(Action):

    def name(self) -> Text:
        return "action_search_restaurant"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entities = tracker.latest_message['entities']
        print(entities)

        for e in entities:
            if e['entity'] == 'hotel':
                name = e['value']

            if name == "indian":
                message = " Idian1, Idian2, Indian3"
            if name == "chineese":
                message = "chineese1, chineese2, chineese3"

        dispatcher.utter_message(text=message)

        return []

class ActionHowToOrder(Action):

    def name(self) -> Text:
        return "how_to_order"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entities = tracker.latest_message['entities']
        print(entities)

        for e in range(len(entities)):
            if entities[e]['entity'] == 'order':
                name = entities[e]

            if name['value'] == "tablet":
                message = " Make your order and press submit when done! "
            if name['value'] == "human":
                message = "One of the humans servers will be with you soon!"

        dispatcher.utter_message(text=message)

        return []
class ActionSearchDrinks(Action):

    def name(self) -> Text:
        return "search_drinks"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:


        drinks = tracker.get_slot("drink")
        my_drinks = ""

        j=0
        for s in drinks:

            my_drinks = my_drinks + s
            if j != (len(drinks)-1):
                if j == (len(drinks)-2):
                    my_drinks += " and "
                else:
                    my_drinks += ", "
            j = j + 1

        dispatcher.utter_message(text= " I'll be right back with " + my_drinks)


        return []
