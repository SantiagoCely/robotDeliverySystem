from collections import deque


class HighLeveLController:
    def __init__(self):
        self.request_stack = deque()
        self.new_request = False

    def create_request(self, req):
        self.request_stack.append(req)
        self.new_request = True

    def pop_request(self):
        self.new_request = False
        return self.request_stack.popleft()

    def is_empty(self):
        if self.request_stack:
            return False
        else :
            return True

