import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import rospy

class DatabaseClass():
    def __init__(self):
        self.cred = credentials.Certificate(
            '/home/user/catkin_ws/src/fds_hlc/src/scripts/ceg4912-3-firebase-adminsdk-85wn5-15b154d6f8.json')
        firebase_admin.initialize_app(self.cred)

        self.db = firestore.client()

        self.order_ref = self.db.collection(u'Orders')
        self.nlp_ref = self.db.collection(u'Nlp')
        self.docs_order = self.order_ref.stream()
        self.nlp_req = self.nlp_ref.stream()

    def update(self):
        self.db = firestore.client()
        self.order_ref = self.db.collection(u'Orders')
        self.nlp_ref = self.db.collection(u'Nlp')
        self.docs_order = self.order_ref.stream()
        self.nlp_req = self.nlp_ref.stream()

    def finished_req(self, idx):
        self.update()
        for doc in self.docs_order:
            if (doc.id == idx):
                self.order_ref.document(idx).set(
                    {u'orderCompleted': True}, merge=True)
                return True
        for doc in self.nlp_req:
            if (doc.id == idx):
                self.nlp_ref.document(idx).set(
                    {u'Acknowledged': True}, merge=True)
                return True
        return False

    def get_req(self):
        self.update()
        for doc in self.docs_order:
            if (doc.to_dict()["ready"] == True and (doc.to_dict()["orderCompleted"] == False)):
                print(doc.to_dict()["table"])

                return doc.id, doc.to_dict()["table"], doc.to_dict()["items"][0]
        for doc in self.nlp_req:
            if (doc.to_dict()["Request"] == "Come to table" and (doc.to_dict()["Acknowledged"] == False)):
                print(doc.to_dict()["Table"])
                return doc.id, doc.to_dict()["Table"], None
        return None, None, None


if __name__ == '__main__':

    d = DatabaseClass()
    x, y, z = d.get_req()
    d.finished_req(x)
    print(z)
