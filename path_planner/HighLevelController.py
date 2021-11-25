from collections import deque


class HighLeveLController:
    def __init__(self):
        self.request_stack = deque()
        self.new_request = False

    def create_request(self, req):
        self.request_stack.append(req)
        self.new_request = True

    def request(self):
        self.new_request = False
        return self.request_stack.popleft()
