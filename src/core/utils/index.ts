export function assertIsNode(e: EventTarget | null): asserts e is Node {
    // assert that an event target is a node
    if (!(e instanceof Node)) {
        throw new Error('Expected a Node');
    }
}
